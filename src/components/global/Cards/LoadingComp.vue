<script setup>
import { computed } from "vue";
import { useLoadingStore } from "@/stores/loading";
defineProps({
    img: String,
    bgcolor: String
})

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.isLoading);
</script>

<template>
    <main :style="{ backgroundColor: bgcolor }" v-if="isLoading">
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
    z-index: 9999 !important;
}

img {
    width: 20%;
    z-index: 10;
}

@media screen and (max-width: 1024px) {
    img {
        width: 90%;
    }
}
</style>