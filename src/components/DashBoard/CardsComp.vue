<script setup>
import { onMounted } from 'vue';
import { CardUtils } from '..';
import { useUsersStore, useTagsStore } from '@/stores';
import { TagMultipleOutline, Account, DoorOpen } from '../icons';

const usersStore = useUsersStore();
const tagsStore = useTagsStore();

onMounted(async () => {
    await usersStore.getUsers();
    await tagsStore.getTags();
    console.log(usersStore.state.users);
});
</script>

<template>
    <section>
        <div class="title">
            Dashboard
        </div>
        <div class="cards">
            <CardUtils :icon="TagMultipleOutline" title="Tags" :number="tagsStore.countTags" />
            <CardUtils :icon="Account" title="Usuários Ativos" :number="usersStore.countUsers" />
            <CardUtils :icon="DoorOpen" title="Acessos Hoje" number="10" />
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