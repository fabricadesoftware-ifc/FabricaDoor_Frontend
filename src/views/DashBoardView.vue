<script setup>
import { onMounted } from 'vue';
import { useUsersStore, useLogsStore, useTagsStore } from '@/stores';
import HeaderComp from '@/components/global/Header/HeaderComp.vue';
import CardsComp from '@/components/DashBoard/CardsComp.vue';
import LogsComp from '@/components/DashBoard/LogsComp.vue';
import TagsComp from '@/components/DashBoard/TagsComp.vue';
import FooterComp from '@/components/global/Footer/FooterComp.vue';
import UsersComp from '@/components/DashBoard/UsersComp.vue';
import DoorControlComp from '@/components/DashBoard/DoorControlComp.vue';

const usersStore = useUsersStore();
const logsStore = useLogsStore();
const tagsStore = useTagsStore();

const refreshAll = async () => {
    await Promise.all([
        usersStore.getUsers(),
        logsStore.getLogs(),
        logsStore.getTodayCount(),
        tagsStore.getTags(),
    ]);
};

onMounted(refreshAll);
</script>

<template>
    <div class="d-flex flex-column min-vh-100">
        <HeaderComp />

        <main class="flex-grow-1 py-6 bg-surface">
            <v-container>
                <div class="d-flex align-center justify-space-between mb-6">
                    <div>
                        <h1 class="text-h4 font-weight-bold">Dashboard</h1>
                        <p class="text-medium-emphasis text-body-2 mt-1">
                            Painel de controle de acesso FabricaDoor
                        </p>
                    </div>
                    <div class="d-flex align-center ga-3">
                        <v-btn icon variant="tonal" color="primary" @click="refreshAll" size="small">
                            <v-icon>mdi-refresh</v-icon>
                            <v-tooltip activator="parent" location="bottom">Atualizar dados</v-tooltip>
                        </v-btn>
                        <v-chip color="primary" size="large" class="px-4">
                            <v-icon start icon="mdi-clock-outline"></v-icon>
                            {{ new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) }}
                        </v-chip>
                    </div>
                </div>

                <CardsComp />

                <v-row class="mt-4">
                    <v-col cols="12" lg="4">
                        <DoorControlComp />
                    </v-col>
                    <v-col cols="12" lg="8">
                        <LogsComp />
                    </v-col>
                </v-row>

                <v-row class="mt-4">
                    <v-col cols="12" md="6">
                        <TagsComp />
                    </v-col>
                    <v-col cols="12" md="6">
                        <UsersComp />
                    </v-col>
                </v-row>
            </v-container>
        </main>

        <FooterComp />
    </div>
</template>

<style scoped>
.min-vh-100 {
    min-height: 100vh;
}

:deep(.v-card) {
    border: 1px solid rgba(var(--v-border-color), 0.08);
}
</style>
