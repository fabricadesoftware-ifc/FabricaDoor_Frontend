<script setup>
import { onMounted } from 'vue';
import { CardUtils } from '..';
import { useUsersStore, useTagsStore } from '@/stores';
import { TagMultipleOutline, Account, DoorOpen } from '../icons';
import { ContentLoader } from 'vue-content-loader';

const usersStore = useUsersStore();
const tagsStore = useTagsStore();

onMounted(async () => {
    await usersStore.getUsers();
    await tagsStore.getTags();
});
</script>

<template>
    <section>
        <div class="title">
            Dashboard
        </div>
        <div class="cards">
                <ContentLoader v-if="tagsStore.isLoading" width="100%" height="120" :speed="2" :primaryColor="'#f3f5f3'" :secondaryColor="'#ecebeb'" style="border-radius: 17px;">
                    <rect x="0" y="0" rx="3" ry="3" width="705" height="120" />
                </ContentLoader>
                <CardUtils v-else :icon="TagMultipleOutline" title="Tags" :number="tagsStore.countTags" />

                <ContentLoader v-if="usersStore.isLoading" width="100%" height="120" :speed="2" :primaryColor="'#f3f5f3'" :secondaryColor="'#ecebeb'" style="border-radius: 17px;">
                    <rect x="0" y="0" rx="3" ry="3" width="705" height="120" />
                </ContentLoader>
                <CardUtils v-else :icon="Account" title="Usuários Ativos" :number="usersStore.countUsers" />

                <ContentLoader v-if="tagsStore.isLoading" width="100%" height="120" :speed="2" :primaryColor="'#f3f5f3'" :secondaryColor="'#ecebeb'" style="border-radius: 17px;">
                    <rect x="0" y="0" rx="3" ry="3" width="705" height="120" />
                </ContentLoader>
                <CardUtils v-else :icon="DoorOpen" title="Acessos Hoje" :number="10" />

        </div>
    </section>
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
</style>