<script setup>
import { ref, computed } from 'vue';
import { ModalUserComp, ModalAddUser } from '..';
import { useUsersStore } from '@/stores';
import { Account } from '../icons';

const usersStore = useUsersStore();
const showModalUser = ref(false);
const showModalAddUser = ref(false);
const selected = ref({});
const searchTerm = ref('');

function openModalUser(data) {
    showModalUser.value = true;
    selected.value = data;
}

const filteredUsers = computed(() => {
    if (!searchTerm.value) return usersStore.state.users.data?.users || [];
    return usersStore.state.users.data?.users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) || [];
});
</script>

<template>
    <ModalUserComp v-model:isOpen="showModalUser" :object-selected="selected" />
    <ModalAddUser v-model:isOpen="showModalAddUser" />

    <v-container class="pa-4">
        <v-card class="pa-4">
            <div class="d-flex flex-wrap align-center gap-4 mb-4">
                <div class="d-flex align-center">
                    <h2 class="text-h5 mr-2">Usuários</h2>
                    <Account />
                </div>

                <v-text-field v-model="searchTerm" prepend-inner-icon="mdi-magnify" label="Buscar..." variant="outlined"
                    density="compact" hide-details class="flex-grow-1" />

                <v-btn color="primary" @click="showModalAddUser = !showModalAddUser" prepend-icon="mdi-plus">
                    Adicionar
                </v-btn>
            </div>

            <v-row>
                <v-col v-for="user in filteredUsers" :key="user.id" cols="12" sm="6" md="4" class="pa-2">
                    <v-card>
                        <v-card-text>
                            <div class="d-flex flex-column gap-2">
                                <div class="d-flex align-center justify-space-between">
                                    <span class="font-weight-medium">ID: {{ user.id }}</span>
                                </div>

                                <div class="d-flex align-center justify-space-between">
                                    <span class="font-weight-medium">Nome: {{ user.name }}</span>
                                </div>

                                <v-divider class="my-2"></v-divider>

                                <div class="d-flex align-center justify-space-between">
                                    <span>Super Usuário:</span>
                                    <v-chip :color="user.isSuper ? 'success' : 'error'" size="small" class="ml-2">
                                        {{ user.isSuper ? 'Sim' : 'Não' }}
                                    </v-chip>
                                </div>

                                <div class="d-flex align-center justify-space-between">
                                    <span>Verificado:</span>
                                    <v-chip :color="user.isVerified ? 'success' : 'error'" size="small" class="ml-2">
                                        {{ user.isVerified ? 'Sim' : 'Não' }}
                                    </v-chip>
                                </div>
                            </div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" variant="text" @click="openModalUser(user)">
                                Editar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    margin: 2rem auto;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #ccc;
}

.title {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.title h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-height: 400px;
    overflow-y: auto;
}

.user-card {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.card-content {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.user-status {
    display: flex;
    gap: 1rem;
}

.user-status p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card-buttons {
    display: flex;
    gap: 0.5rem;
}

.search {
    display: flex;
    padding: .5rem 0;
    border-radius: 15px;
}

.search input {
    border: 2px solid #ccc;
    padding: .5rem;
    border-radius: 15px;
    outline: none;
}

@media screen and (max-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
        max-height: 400px;
        overflow-y: auto;
        scrollbar-width: none;
    }

    .card-grid::-webkit-scrollbar {
        display: none;
    }

    .title {
        flex-direction: column;
        align-items: flex-start;
    }

    .user-status {
        flex-direction: column;
    }
}

@media screen and (max-width: 600px) {
    .card-grid {
        grid-template-columns: 1fr;
    }

    section {
        width: 90%;
        padding: 2rem 1rem;
    }

    .search input {
        width: 100%;
    }
}
</style>
