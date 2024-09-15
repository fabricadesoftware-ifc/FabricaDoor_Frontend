<script setup>
defineProps({
    img: String,
    bgcolor: String
})

</script>

<template>
    <main :style="{ backgroundColor: bgcolor }">
        <img :src="img" alt="">
    </main>
</template>

<style scoped>
main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
}

img {
    width: 20%;
    z-index: 10;
}
</style>