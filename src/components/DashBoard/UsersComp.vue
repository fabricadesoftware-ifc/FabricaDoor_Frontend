<script setup>
import { ref, computed } from 'vue';
import { ModalUserComp, ModalAddUser } from '..';
import { useUsersStore } from '@/stores';

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
    const users = usersStore.state.users.data?.users || [];
    if (!searchTerm.value) return users;
    return users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});
</script>

<template>
    <ModalUserComp v-model:isOpen="showModalUser" :object-selected="selected" />
    <ModalAddUser v-model:isOpen="showModalAddUser" />

    <v-card height="100%" class="d-flex flex-column">
        <v-card-item class="pb-0">
            <div class="d-flex flex-wrap align-center justify-space-between ga-3 mb-4">
                <div class="d-flex align-center">
                    <v-avatar color="success" class="mr-4">
                        <v-icon>mdi-account-group</v-icon>
                    </v-avatar>
                    <div>
                        <v-card-title class="text-h5 pa-0">Usuários</v-card-title>
                        <p class="text-caption text-medium-emphasis">Gerenciar usuários do sistema</p>
                    </div>
                </div>

                <div class="d-flex align-center ga-3">
                    <v-text-field v-model="searchTerm" prepend-inner-icon="mdi-magnify" placeholder="Buscar usuário..."
                        variant="outlined" density="compact" hide-details style="min-width: 220px;" />
                    <v-btn color="primary" @click="showModalAddUser = true" prepend-icon="mdi-plus">
                        Adicionar
                    </v-btn>
                </div>
            </div>
        </v-card-item>

        <v-card-text class="flex-grow-1 pt-0">
            <template v-if="usersStore.isLoading">
                <v-row>
                    <v-col v-for="n in 3" :key="n" cols="12" sm="6" md="4">
                        <v-skeleton-loader type="card" />
                    </v-col>
                </v-row>
            </template>

            <template v-else-if="filteredUsers.length === 0">
                <div class="d-flex flex-column align-center justify-center py-12 text-center">
                    <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-account-off-outline</v-icon>
                    <p class="text-h6 text-medium-emphasis">
                        {{ searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado' }}
                    </p>
                    <p class="text-body-2 text-medium-emphasis">
                        {{ searchTerm ? 'Tente buscar com outro termo' : 'Adicione um novo usuário para começar' }}
                    </p>
                </div>
            </template>

            <template v-else>
                <v-row class="overflow-y-auto" style="max-height: 420px;">
                    <v-col v-for="user in filteredUsers" :key="user.id" cols="12" sm="6" md="4">
                        <v-card variant="outlined" class="user-card h-100" @click="openModalUser(user)">
                            <v-card-item>
                                <div class="d-flex align-center mb-3">
                                    <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                                        <span class="text-subtitle-2 font-weight-bold">
                                            {{ user.name?.charAt(0)?.toUpperCase() }}
                                        </span>
                                    </v-avatar>
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-subtitle-1 font-weight-medium text-truncate">{{ user.name }}</p>
                                        <p class="text-caption text-medium-emphasis text-truncate">{{ user.email }}</p>
                                    </div>
                                </div>

                                <div class="d-flex ga-2">
                                    <v-chip :color="user.isSuper ? 'warning' : 'default'" size="x-small"
                                        variant="tonal">
                                        <v-icon start size="12">{{ user.isSuper ? 'mdi-shield-crown' : 'mdi-account'
                                            }}</v-icon>
                                        {{ user.isSuper ? 'Admin' : 'Usuário' }}
                                    </v-chip>
                                    <v-chip :color="user.isVerified ? 'success' : 'error'" size="x-small"
                                        variant="tonal">
                                        <v-icon start size="12">{{ user.isVerified ? 'mdi-check-decagram' :
                                            'mdi-alert-circle' }}</v-icon>
                                        {{ user.isVerified ? 'Verificado' : 'Pendente' }}
                                    </v-chip>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.user-card {
    cursor: pointer;
    transition: all 0.2s ease;
}

.user-card:hover {
    border-color: rgb(var(--v-theme-primary));
    background-color: rgba(var(--v-theme-primary), 0.04);
}
</style>
