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
    console.log(usersStore.state.users);
});
</script>

<template>
    <HeaderComp />
    <CardsComp />
    <section class="two">
        <TagsComp />
        <LogsComp />
    </section>
    <UsersComp />
    <FooterComp />
</template>

<style scoped>
section.two {
    display: flex;
    gap: 1rem;
    width: 80%;
    margin: auto;
}

@media screen and (max-width: 1024px) {
    section.two {
        flex-direction: column;
    }
}
</style>