<script setup>
import ToggleMode from '../global/Buttons/ToggleMode.vue';
</script>

<template>
    <section>
        <div class="title">
            <!-- <h1>Modo do ESP32:</h1> -->
            <ToggleMode />
        </div>
    </section>

</template>

<style scoped>
section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 20px auto;
}

.title {
    font-size: 2rem;
    font-weight: 600;
    width: 100%;
    display: flex;
}
</style>