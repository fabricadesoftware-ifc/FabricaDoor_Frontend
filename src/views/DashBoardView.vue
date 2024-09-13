<script setup>
import HeaderComp from '@/components/global/Header/HeaderComp.vue';
import CardsComp from '@/components/DashBoard/CardsComp.vue';
import LogsComp from '@/components/DashBoard/LogsComp.vue';
import TagsComp from '@/components/DashBoard/TagsComp.vue';
import FooterComp from '@/components/global/Footer/FooterComp.vue';
</script>

<template>
    <HeaderComp />
    <CardsComp />
    <section class="two">
        <TagsComp />
        <LogsComp />
    </section>
    <FooterComp />
</template>

<style scoped>
section.two {
    display: flex;
    gap: 1rem;
    width: 95%;
    margin: auto;
}
</style>