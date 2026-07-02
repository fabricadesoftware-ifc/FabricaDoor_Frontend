<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useDoorStore, useUsersStore } from "@/stores";
import { toast } from "vue3-toastify";
import { Account } from "../icons";

const usersStore = useUsersStore();
const doorStore = useDoorStore();

const props = defineProps({
    isOpen: Boolean,
    objectSelected: Object,
});

const emit = defineEmits(["update:isOpen"]);

// Criar estado local para armazenar os dados do objeto selecionado
const localObject = ref({ ...props.objectSelected });
const polling = ref(null);

const fingerprintStatus = computed(() => doorStore.state.fingerprintStatus || {});
const fingerprints = computed(() => doorStore.state.fingerprints || []);
const fingerprintLoading = computed(() => doorStore.state.fingerprintLoading);
const userFingerprints = computed(() =>
    fingerprints.value.filter((fingerprint) => Number(fingerprint.user_id) === Number(localObject.value?.id))
);

const activeEnrollStates = ["waiting_first_finger", "remove_finger", "waiting_second_finger"];
const isEnrolling = computed(() => activeEnrollStates.includes(fingerprintStatus.value.enroll_state_text));
const isEnrollingThisUser = computed(() =>
    isEnrolling.value && Number(fingerprintStatus.value.enroll_user_id) === Number(localObject.value?.id)
);

const fingerprintStatusText = computed(() => {
    const messages = {
        idle: "Sensor pronto",
        waiting_first_finger: "Coloque o dedo no sensor",
        remove_finger: "Remova o dedo",
        waiting_second_finger: "Coloque o mesmo dedo novamente",
        done: "Cadastro concluido",
        failed: "Cadastro falhou"
    };

    if (!fingerprintStatus.value.sensor_ok) return "Sensor indisponivel";
    return messages[fingerprintStatus.value.enroll_state_text] || "Aguardando status";
});

// Atualizar estado local quando a prop mudar
watch(() => props.objectSelected, (newObject) => {
    localObject.value = { ...newObject };
});

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        refreshFingerprints().catch(() => {});
    } else {
        stopPolling();
    }
});

const closeModal = () => {
    emit("update:isOpen", false);
};

const valid = ref(true);

const nameRules = [
    v => !!v || 'Nome é obrigatório',
    v => v.length >= 3 || 'Nome deve ter no mínimo 3 caracteres',
];

const emailRules = [
    v => !!v || 'E-mail é obrigatório',
    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
];

const handleSubmit = async () => {
    if (!valid.value) return;
    await usersStore.updateUser(localObject.value);
    closeModal();
};

const refreshFingerprints = async () => {
    await Promise.all([
        doorStore.getFingerprintStatus(),
        doorStore.getFingerprints()
    ]);

    if (isEnrolling.value) {
        startPolling();
    }
};

const stopPolling = () => {
    if (polling.value) {
        clearInterval(polling.value);
        polling.value = null;
    }
};

const startPolling = () => {
    stopPolling();
    polling.value = setInterval(async () => {
        try {
            await doorStore.getFingerprintStatus();
            if (!isEnrolling.value) {
                stopPolling();
                await doorStore.getFingerprints();
            }
        } catch {
            stopPolling();
        }
    }, 2000);
};

const handleEnrollFingerprint = async () => {
    try {
        await doorStore.enrollFingerprint({ userId: Number(localObject.value.id) });
        toast.success("Cadastro biometrico iniciado");
        startPolling();
    } catch (error) {
        toast.error(error?.response?.data?.error || "Erro ao iniciar cadastro biometrico");
    }
};

const handleCancelFingerprint = async () => {
    try {
        await doorStore.cancelFingerprintEnroll();
        stopPolling();
        toast.success("Cadastro cancelado");
        await refreshFingerprints();
    } catch (error) {
        toast.error(error?.response?.data?.error || "Erro ao cancelar cadastro");
    }
};

const handleDeleteFingerprint = async (slot) => {
    try {
        await doorStore.deleteFingerprint(slot);
        toast.success(`Digital do slot ${slot} removida`);
        await refreshFingerprints();
    } catch (error) {
        toast.error(error?.response?.data?.error || "Erro ao remover digital");
    }
};

onBeforeUnmount(stopPolling);
</script>

<template>
    <v-dialog :model-value="isOpen" @update:model-value="emit('update:isOpen', $event)" max-width="500"
        transition="dialog-bottom-transition" persistent>
        <v-card class="rounded-lg">
            <v-card-item>
                <div class="d-flex align-center mb-4">
                    <v-avatar color="primary" class="mr-4">
                        <Account :size="24" color="white" />
                    </v-avatar>
                    <v-card-title class="text-h6">
                        Editar Usuário
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon variant="text" @click="closeModal">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <v-card-subtitle class="text-center pb-0">
                    Edite as informações do usuário abaixo.
                </v-card-subtitle>

                <v-card-text class="pt-4">
                    <v-form v-model="valid">
                        <v-text-field v-model="localObject.name" :rules="nameRules" label="Nome"
                            prepend-inner-icon="mdi-account" variant="outlined" required class="mb-3"></v-text-field>

                        <v-text-field v-model="localObject.email" :rules="emailRules" label="E-mail"
                            prepend-inner-icon="mdi-email" variant="outlined" required class="mb-3"></v-text-field>

                        <v-switch v-model="localObject.isSuper" label="Super Usuário" color="primary" hide-details
                            class="mb-3"></v-switch>

                        <v-switch v-model="localObject.isVerified" label="Verificado" color="success"
                            hide-details></v-switch>
                    </v-form>

                    <v-divider class="my-4"></v-divider>

                    <div class="d-flex align-center justify-space-between mb-3">
                        <div>
                            <p class="text-subtitle-2 font-weight-medium mb-1">Biometria</p>
                            <p class="text-caption text-medium-emphasis">{{ fingerprintStatusText }}</p>
                        </div>
                        <v-btn icon variant="tonal" size="small" :loading="fingerprintLoading"
                            @click="refreshFingerprints">
                            <v-icon>mdi-refresh</v-icon>
                            <v-tooltip activator="parent" location="bottom">Atualizar digitais</v-tooltip>
                        </v-btn>
                    </div>

                    <v-list v-if="userFingerprints.length" density="compact" class="mb-3">
                        <v-list-item v-for="fingerprint in userFingerprints" :key="fingerprint.slot">
                            <template #prepend>
                                <v-avatar color="primary" variant="tonal" size="34">
                                    <v-icon>mdi-fingerprint</v-icon>
                                </v-avatar>
                            </template>
                            <v-list-item-title>Digital cadastrada</v-list-item-title>
                            <v-list-item-subtitle>Slot {{ fingerprint.slot }}</v-list-item-subtitle>
                            <template #append>
                                <v-btn icon variant="text" color="error" size="small" :loading="fingerprintLoading"
                                    @click="handleDeleteFingerprint(fingerprint.slot)">
                                    <v-icon>mdi-delete-outline</v-icon>
                                    <v-tooltip activator="parent" location="bottom">Remover digital</v-tooltip>
                                </v-btn>
                            </template>
                        </v-list-item>
                    </v-list>

                    <v-alert v-else type="info" variant="tonal" density="compact" class="mb-3">
                        Este usuario ainda nao possui biometria cadastrada.
                    </v-alert>

                    <div class="d-flex flex-wrap ga-2">
                        <v-btn color="secondary" variant="tonal" prepend-icon="mdi-fingerprint"
                            :loading="fingerprintLoading && !isEnrolling"
                            :disabled="!localObject.id || isEnrolling"
                            @click="handleEnrollFingerprint">
                            Cadastrar biometria
                        </v-btn>
                        <v-btn v-if="isEnrollingThisUser" color="warning" variant="tonal" prepend-icon="mdi-cancel"
                            @click="handleCancelFingerprint">
                            Cancelar cadastro
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card-item>

            <v-divider></v-divider>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" variant="tonal" prepend-icon="mdi-delete"
                    @click="usersStore.deleteUser(Number(localObject.id))" class="text-none mr-2">
                    Excluir
                </v-btn>
                <v-btn color="primary" :disabled="!valid" @click="handleSubmit" class="text-none"
                    prepend-icon="mdi-content-save">
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
</style>
