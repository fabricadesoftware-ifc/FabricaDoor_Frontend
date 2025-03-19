<script setup>
import { ThemeLightDark } from '@/components/icons';
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
    border: 2px solid #c1c1c1;
}

span {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 1024px) {
    button {
        top: 90%;
        left: 80%;
    }
    
}
</style>