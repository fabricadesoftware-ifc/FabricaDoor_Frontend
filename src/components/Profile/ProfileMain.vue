<script setup>
import { InfoProfile, MyTags } from '..';
import { useTagsStore } from '@/stores';

const tagsStore = useTagsStore();
</script>

<template>
    <main>
        <InfoProfile />
        <MyTags />
        <!-- <MyLogs /> -->
    </main>
</template>

<style scoped>
main {
    width: 50%;
    margin: 30px auto;
    border: 1px solid #ccc;
    height: 40vh;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

@media screen and (max-width: 1024px) {
    main {
        width: 90%;
        height: 90vh;
    }
}
</style>