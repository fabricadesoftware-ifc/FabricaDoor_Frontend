<script setup>
import { ref, computed } from 'vue';
import { ModalComp, AssignUserTagComp } from '..';
import { TagMultipleOutline } from '../icons';
import { useTagsStore } from '@/stores';

const tagsStore = useTagsStore();

const tags = computed(() => tagsStore.state.tags);
const searchTerm = ref("");

const filteredTags = computed(() => {
    return [...tags.value]
        .filter(tag => {
            const term = searchTerm.value.toLowerCase();
            const rfidMatch = tag.rfid?.toLowerCase().includes(term);
            const userNameMatch = tag.user?.name?.toLowerCase().includes(term);
            return rfidMatch || userNameMatch;
        })
        .sort((a, b) => b.valid - a.valid);
});

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
    emit("update:isOpen", false);
};

const showModal = ref(false);
const showModalTags = ref(false);
const selected = ref({});

function openModalValid(item) {
    selected.value = item;
    showModal.value = true;
}

function openModalTag(item) {
    selected.value = item;
    showModalTags.value = true;
}

// Adicionar handler para tecla Esc
const handleKeydown = (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
};
</script>

<template>
    <ModalComp v-model:isOpen="showModal" :objectSelected="selected" />
    <AssignUserTagComp v-model:isOpen="showModalTags" :object-selected="selected" />

    <v-dialog :model-value="isOpen" @update:model-value="emit('update:isOpen', $event)" max-width="1200"
        max-height="600" transition="dialog-bottom-transition" persistent @keydown="handleKeydown">
        <v-card>
            <v-toolbar color="primary" class="px-5">
                <v-avatar color="surface" class="mr-2">
                    <TagMultipleOutline :size="24" />
                </v-avatar>
                <v-toolbar-title>Gerenciar Tags</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchTerm" prepend-inner-icon="mdi-magnify"
                    label="Pesquisar por RFID ou nome do usuário" single-line hide-details variant="solo-filled"
                    density="compact" class="mx-4" style="max-width: 300px"></v-text-field>
                <v-btn icon size="large" color="surface" variant="text" @click="closeModal">
                    <v-icon size="28">mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container fluid class="pa-6" style="max-height: 700px; overflow-y: auto;">
                <v-row>
                    <v-col v-for="(item, index) in filteredTags" :key="index" cols="12" sm="6" md="4" lg="3">
                        <v-card elevation="1" class="h-100">
                            <v-card-item>
                                <template v-slot:prepend>
                                    <v-avatar :color="item.valid ? 'success' : 'error'" class="mr-4">
                                        <v-icon>{{ item.valid ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                                    </v-avatar>
                                </template>
                                <v-card-title>Tag #{{ item.id }}</v-card-title>
                                <v-card-subtitle>{{ item.rfid }}</v-card-subtitle>
                            </v-card-item>

                            <v-card-text>
                                <v-list>
                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-icon color="primary">mdi-account</v-icon>
                                        </template>
                                        <v-list-item-title>Usuário</v-list-item-title>
                                        <v-list-item-subtitle>{{ item.user?.name || "Não Atribuído"
                                            }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-icon :color="item.valid ? 'success' : 'error'">
                                                {{ item.valid ? 'mdi-check-circle' : 'mdi-close-circle' }}
                                            </v-icon>
                                        </template>
                                        <v-list-item-title>Status</v-list-item-title>
                                        <v-list-item-subtitle>
                                            <v-chip :color="item.valid ? 'success' : 'error'" size="small">
                                                {{ item.valid ? 'Ativo' : 'Desativado' }}
                                            </v-chip>
                                        </v-list-item-subtitle>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>

                            <v-card-actions class="pa-4">
                                <v-spacer></v-spacer>
                                <v-btn v-if="!item.user" color="primary" variant="tonal" prepend-icon="mdi-account-plus"
                                    @click="openModalTag(item)">
                                    Atribuir
                                </v-btn>
                                <v-btn v-else :color="item.valid ? 'error' : 'success'"
                                    :prepend-icon="item.valid ? 'mdi-close-circle' : 'mdi-check-circle'"
                                    @click="openModalValid(item)">
                                    {{ item.valid ? 'Desativar' : 'Ativar' }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.v-dialog>.v-card {
    overflow: hidden;
}

:deep(.v-toolbar-title) {
    font-size: 1.25rem;
    font-weight: 500;
}
</style>
