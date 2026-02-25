<script setup>
import { ref } from 'vue';
import { useDoorStore } from '@/stores';
import { toast } from 'vue3-toastify';

const doorStore = useDoorStore();
const isOpening = ref(false);
const isToggling = ref(false);
const doorCooldown = ref(false);
const isCAMode = ref(false);

const handleOpenDoor = async () => {
    if (doorCooldown.value) return;
    isOpening.value = true;
    doorCooldown.value = true;

    try {
        await doorStore.openDoor();
        toast.success('Porta aberta com sucesso!');
    } catch {
        toast.error('Erro ao abrir a porta');
    } finally {
        isOpening.value = false;
        setTimeout(() => {
            doorCooldown.value = false;
        }, 5000);
    }
};

const handleToggleMode = async (newMode) => {
    if (newMode === isCAMode.value) return;
    const previousMode = isCAMode.value;
    isToggling.value = true;
    isCAMode.value = newMode;
    try {
        await doorStore.toggleMode();
        toast.success(`Modo alterado para ${newMode ? 'CA (Controlado)' : 'OP (Aberto)'}`);
    } catch {
        isCAMode.value = previousMode;
        toast.error('Erro ao alternar o modo');
    } finally {
        isToggling.value = false;
    }
};
</script>

<template>
    <v-card height="100%" class="d-flex flex-column">
        <v-card-item>
            <div class="d-flex align-center mb-4">
                <v-avatar color="primary" class="mr-4">
                    <v-icon>mdi-door</v-icon>
                </v-avatar>
                <v-card-title class="text-h5">Controle da Porta</v-card-title>
            </div>
        </v-card-item>

        <v-card-text class="flex-grow-1 d-flex flex-column justify-center ga-6 px-6">
            <div class="text-center">
                <v-btn :loading="isOpening" :disabled="doorCooldown" color="error" size="x-large" rounded="pill"
                    class="open-door-btn px-10" elevation="4" @click="handleOpenDoor">
                    <v-icon start size="24">mdi-door-open</v-icon>
                    {{ doorCooldown ? 'Aguarde...' : 'Abrir Porta' }}
                </v-btn>
                <p class="text-caption text-medium-emphasis mt-3">
                    {{ doorCooldown ? 'Cooldown de 5 segundos' : 'Clique para destravar a porta' }}
                </p>
            </div>

            <v-divider class="my-2"></v-divider>

            <div>
                <div class="d-flex align-center justify-space-between">
                    <div>
                        <p class="text-subtitle-1 font-weight-medium">Modo de Operação</p>
                        <p class="text-caption text-medium-emphasis">
                            {{ isCAMode ? 'CA - Acesso Controlado (RFID)' : 'OP - Porta Aberta (livre)' }}
                        </p>
                    </div>
                    <v-btn-group divided variant="outlined" density="comfortable" rounded="lg">
                        <v-btn :loading="isToggling" :color="isCAMode ? 'primary' : undefined"
                            :variant="isCAMode ? 'flat' : 'outlined'"
                            @click="handleToggleMode(true)" min-width="60">
                            <v-icon start size="18">mdi-lock</v-icon>
                            CA
                        </v-btn>
                        <v-btn :loading="isToggling" :color="!isCAMode ? 'success' : undefined"
                            :variant="!isCAMode ? 'flat' : 'outlined'"
                            @click="handleToggleMode(false)" min-width="60">
                            <v-icon start size="18">mdi-lock-open</v-icon>
                            OP
                        </v-btn>
                    </v-btn-group>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.open-door-btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.5px;
}

.open-door-btn:not(:disabled):hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(176, 0, 32, 0.35) !important;
}

.open-door-btn:active {
    transform: scale(0.98);
}
</style>
