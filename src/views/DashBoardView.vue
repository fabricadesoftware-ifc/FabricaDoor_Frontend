<script setup>
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores';
import HeaderComp from '@/components/global/Header/HeaderComp.vue';
import CardsComp from '@/components/DashBoard/CardsComp.vue';
import LogsComp from '@/components/DashBoard/LogsComp.vue';
import TagsComp from '@/components/DashBoard/TagsComp.vue';
import FooterComp from '@/components/global/Footer/FooterComp.vue';
import UsersComp from '@/components/DashBoard/UsersComp.vue';

const usersStore = useUsersStore();

onMounted(async () => {
    await usersStore.getUsers();
});
</script>

<template>
    <div class="d-flex flex-column min-vh-100">
        <HeaderComp />

        <main class="flex-grow-1 py-6 bg-surface">
            <v-container>
                <div class="d-flex align-center justify-space-between mb-6">
                    <h1 class="text-h4 font-weight-bold">Dashboard</h1>
                    <v-chip color="primary" size="large" class="px-4">
                        <v-icon start icon="mdi-clock-outline"></v-icon>
                        {{ new Date().toLocaleDateString('pt-BR') }}
                    </v-chip>
                </div>

                <CardsComp />

                <v-row class="mt-6">
                    <v-col cols="12" md="6">
                        <TagsComp />
                    </v-col>
                    <v-col cols="12" md="6">
                        <LogsComp />
                    </v-col>
                </v-row>

                <v-row class="mt-6">
                    <v-col cols="12">
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
    border: 1px solid rgba(var(--v-border-color), 0.1);
}
</style>