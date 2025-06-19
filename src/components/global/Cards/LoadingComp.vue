<script setup>
import { computed } from "vue";
import { useLoadingStore } from "@/stores/loading";

defineProps({
    img: String
});

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.isLoading);
</script>

<template>
    <v-overlay v-model="isLoading" class="align-center justify-center">
        <v-img :src="img" max-width="300" class="mx-auto" />
    </v-overlay>
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