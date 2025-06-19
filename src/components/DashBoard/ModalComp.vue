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
                                <v-chip :color="props.objectSelected?.valid ? 'success' : 'error'" size="small"
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
                <v-btn color="error" variant="tonal" prepend-icon="mdi-delete"
                    @click="tagsStore.deleteTags(props.objectSelected?.id)" class="text-none">
                    Excluir
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
main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000083;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 200 !important;
    backdrop-filter: blur(5px);
}

section {
    width: 90%;
    max-width: 500px;
    height: auto;
    background-color: white;
    border-radius: 15px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    box-shadow: 0 0 10px 0 #00000083;
    z-index: 300;
}

button.close {
    width: 10%;
    border: 0;
    background-color: transparent;
    font-size: 1.5rem;
    color: #6d6d6d;
    cursor: pointer;
}

.subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6d6d6d;
}

.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

span {
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
}

.info {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.info>p {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 500;
}

p>span {
    font-weight: 400;
}

/* Responsividade para dispositivos móveis */
@media (max-width: 768px) {
    section {
        width: 90%;
        max-width: 100%;
        padding: 1.5rem;
    }

    .buttons {
        flex-direction: column;
        gap: 0.5rem;
    }

    button.close {
        font-size: 1.2rem;
    }

    .title h2 {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .text h2 {
        font-size: 1rem;
    }

    .subtitle {
        font-size: 0.875rem;
    }
}
</style>
