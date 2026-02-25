<script setup>
import { AlertOutline } from '../icons';
import { useTagsStore } from '@/stores';

const tagsStore = useTagsStore();
const props = defineProps({
    isOpen: Boolean,
    objectSelected: Object,
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
    emit("update:isOpen", false);
};
</script>

<template>
    <v-dialog :model-value="isOpen" @update:model-value="emit('update:isOpen', $event)" max-width="500"
        transition="dialog-bottom-transition" persistent>
        <v-card class="rounded-lg">
            <v-card-item>
                <div class="d-flex align-center mb-4">
                    <v-avatar :color="props.objectSelected?.valid ? 'error' : 'success'" class="mr-4">
                        <AlertOutline :size="24" color="white" />
                    </v-avatar>
                    <v-card-title class="text-h6">
                        Confirmação de {{ props.objectSelected?.valid ? 'Desativação' : 'Ativação' }} de Tag
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon variant="text" @click="closeModal">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <v-card-subtitle class="text-center pb-0">
                    Você está prestes a {{ props.objectSelected?.valid ? 'desativar' : 'ativar' }} uma tag.
                    Por favor, confirme os detalhes abaixo.
                </v-card-subtitle>

                <v-card-text class="pt-4">
                    <v-list>
                        <v-list-item>
                            <template v-slot:prepend>
                                <v-icon color="primary" icon="mdi-pound" />
                            </template>
                            <v-list-item-title>Id da Tag</v-list-item-title>
                            <v-list-item-subtitle>{{ props.objectSelected?.id }}</v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                            <template v-slot:prepend>
                                <v-icon color="primary" icon="mdi-card" />
                            </template>
                            <v-list-item-title>RFID</v-list-item-title>
                            <v-list-item-subtitle>{{ props.objectSelected?.rfid }}</v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                            <template v-slot:prepend>
                                <v-icon :color="props.objectSelected?.valid ? 'success' : 'error'"
                                    :icon="props.objectSelected?.valid ? 'mdi-check-circle' : 'mdi-close-circle'" />
                            </template>
                            <v-list-item-title>Status</v-list-item-title>
                            <v-list-item-subtitle>
                                <v-chip :color="props.objectSelected?.valid ? 'success' : 'error'" width="300px"
                                    class="text-uppercase">
                                    {{ props.objectSelected?.valid ? 'Ativo' : 'Desativado' }}
                                </v-chip>
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card-item>

            <v-divider></v-divider>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="warning" variant="tonal" prepend-icon="mdi-account-remove"
                    @click="tagsStore.unassignTag(props.objectSelected?.id)" class="text-none">
                    Desvincular
                </v-btn>
                <v-btn :color="props.objectSelected?.valid ? 'error' : 'success'"
                    :prepend-icon="props.objectSelected?.valid ? 'mdi-close-circle' : 'mdi-check-circle'"
                    @click="tagsStore.verifyTag(props.objectSelected?.id)" class="text-none">
                    {{ props.objectSelected?.valid ? 'Desativar' : 'Ativar' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
</style>
