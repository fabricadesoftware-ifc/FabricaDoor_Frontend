<script setup>
import ThemeLightDark from "vue-material-design-icons/ThemeLightDark.vue";
</script>

<template>
    <button>
        <ThemeLightDark :size="35" />
    </button>
</template>

<style scoped>
button {
    position: fixed;
    top: 85%;
    left: 93%;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

span {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>