<script setup>
import InfoProfile from './InfoProfile.vue';
import MyTags from './MyTags.vue';
import MyLogs from './MyLogs.vue';
</script>

<template>
    <main>
        <InfoProfile />
        <MyTags />
        <MyLogs />
    </main>
</template>

<style scoped>
main {
    width: 50%;
    margin: 30px auto;
    border: 1px solid #ccc;
    height: 80vh;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

@media screen and (max-width: 1024px) {
    main {
        width: 90%;
        height: 160vh;
    }
}
</style>