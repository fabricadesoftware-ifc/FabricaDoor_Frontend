<script setup>
import HeaderComp from '@/components/global/Header/HeaderComp.vue';
import ProfileMain from '@/components/Profile/ProfileMain.vue';
import FooterComp from '@/components/global/Footer/FooterComp.vue';
import { useTagsStore } from '@/stores';

const tagsStore = useTagsStore();
</script>

<template>
    <HeaderComp />
    <ProfileMain />
    <FooterComp  />
</template>

<style scoped></style>