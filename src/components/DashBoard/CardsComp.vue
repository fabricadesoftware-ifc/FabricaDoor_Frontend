<script setup>
import { onMounted } from 'vue';
import { useUsersStore, useTagsStore } from '@/stores';
import { TagMultipleOutline, Account, DoorOpen } from '../icons';

const usersStore = useUsersStore();
const tagsStore = useTagsStore();

onMounted(async () => {
    await usersStore.getUsers();
    await tagsStore.getTags();
});
</script>

<template>
    <v-row>
        <v-col cols="12" sm="4">
            <v-card elevation="1" class="h-100 card-hover">
                <v-card-item>
                    <template v-if="tagsStore.isLoading">
                        <v-skeleton-loader type="card" />
                    </template>
                    <template v-else>
                        <div class="d-flex align-center mb-4">
                            <v-avatar color="primary" class="mr-4">
                                <TagMultipleOutline :size="24" color="white" />
                            </v-avatar>
                            <v-card-title class="text-h6 text-on-surface">Tags</v-card-title>
                        </div>
                        <v-card-text class="text-h4 text-on-surface pa-0">
                            {{ tagsStore.countTags }}
                        </v-card-text>
                    </template>
                </v-card-item>
            </v-card>
        </v-col>

        <v-col cols="12" sm="4">
            <v-card elevation="1" class="h-100 card-hover">
                <v-card-item>
                    <template v-if="usersStore.isLoading">
                        <v-skeleton-loader type="card" />
                    </template>
                    <template v-else>
                        <div class="d-flex align-center mb-4">
                            <v-avatar color="success" class="mr-4">
                                <Account :size="24" color="white" />
                            </v-avatar>
                            <v-card-title class="text-h6 text-on-surface">Usuários Ativos</v-card-title>
                        </div>
                        <v-card-text class="text-h4 text-on-surface pa-0">
                            {{ usersStore.countUsers }}
                        </v-card-text>
                    </template>
                </v-card-item>
            </v-card>
        </v-col>

        <v-col cols="12" sm="4">
            <v-card elevation="1" class="h-100 card-hover">
                <v-card-item>
                    <template v-if="tagsStore.isLoading">
                        <v-skeleton-loader type="card" />
                    </template>
                    <template v-else>
                        <div class="d-flex align-center mb-4">
                            <v-avatar color="info" class="mr-4">
                                <DoorOpen :size="24" color="white" />
                            </v-avatar>
                            <v-card-title class="text-h6 text-on-surface">Acessos Hoje</v-card-title>
                        </div>
                        <v-card-text class="text-h4 text-on-surface pa-0">
                            10
                        </v-card-text>
                    </template>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
section {
    width: 80%;
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.title {
    font-size: 2rem;
    font-weight: 600;
}

.cards {
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}

@media screen and (max-width: 1024px) {
    section {
        width: 90%;
    }

    .cards {
        flex-direction: column;
    }
}

.card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
}

.card-hover:hover {
    transform: translateY(-4px);
    border-color: var(--v-border-color);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.02) !important;
}
</style>