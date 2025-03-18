<script setup>
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores';
import { toast } from 'vue3-toastify';
import HeaderComp from '@/components/global/Header/HeaderComp.vue';
import CardsComp from '@/components/DashBoard/CardsComp.vue';
import LogsComp from '@/components/DashBoard/LogsComp.vue';
import TagsComp from '@/components/DashBoard/TagsComp.vue';
import FooterComp from '@/components/global/Footer/FooterComp.vue';
import UsersComp from '@/components/DashBoard/UsersComp.vue';

const usersStore = useUsersStore();

toast.info('Bem vindo ao Dashboard!');
onMounted(async () => {
    await usersStore.getUsers();
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
        width: 90%;
    }
}
</style>