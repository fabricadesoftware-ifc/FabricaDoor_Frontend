<script setup>
import { computed } from 'vue';
import { useUsersStore, useTagsStore, useLogsStore } from '@/stores';
import { TagMultipleOutline, Account, DoorOpen } from '../icons';

const usersStore = useUsersStore();
const tagsStore = useTagsStore();
const logsStore = useLogsStore();

const todayAccessCount = computed(() => logsStore.state.todayCount);

const activeTagsCount = computed(() => {
    return tagsStore.state.tags.filter(tag => tag.valid).length;
});

const cards = computed(() => [
    {
        title: 'Tags Cadastradas',
        value: tagsStore.countTags,
        subtitle: `${activeTagsCount.value} ativas`,
        icon: TagMultipleOutline,
        color: 'primary',
        loading: tagsStore.isLoading,
    },
    {
        title: 'Usuários Ativos',
        value: usersStore.countUsers ?? 0,
        subtitle: 'Cadastrados no sistema',
        icon: Account,
        color: 'success',
        loading: usersStore.isLoading,
    },
    {
        title: 'Acessos Hoje',
        value: todayAccessCount.value,
        subtitle: `${logsStore.state.logs.length} registros total`,
        icon: DoorOpen,
        color: 'info',
        loading: logsStore.state.loading,
    },
]);
</script>

<template>
    <v-row>
        <v-col v-for="(card, i) in cards" :key="i" cols="12" sm="4">
            <v-card class="h-100 card-hover" elevation="1">
                <v-card-item>
                    <template v-if="card.loading">
                        <v-skeleton-loader type="list-item-avatar-two-line" />
                    </template>
                    <template v-else>
                        <div class="d-flex align-center mb-3">
                            <v-avatar :color="card.color" class="mr-4" size="48">
                                <component :is="card.icon" :size="24" color="white" />
                            </v-avatar>
                            <div>
                                <p class="text-body-2 text-medium-emphasis mb-1">{{ card.title }}</p>
                                <p class="text-h4 font-weight-bold text-on-surface">{{ card.value }}</p>
                            </div>
                        </div>
                        <p class="text-caption text-medium-emphasis">{{ card.subtitle }}</p>
                    </template>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
}

.card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.02) !important;
}
</style>
