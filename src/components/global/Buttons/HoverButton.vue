<script setup>
defineProps({
    text: String,
    color: String,
    hoverTextColor: String
});
</script>

<template>
    <button :style="{ borderColor: color }">
        {{ text }}
    </button>
</template>

<style scoped>
:host {
    --button-color: green;
    --button-background-color: green;
    --button-border-color: green;
    --button-hover-text-color: white;
}

button {
    padding: 0.4em 1.2em;
    position: relative;
    overflow: hidden;
    background-color: transparent;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    transition: color 0.3s ease, background-color 0.3s ease;
    font-family: inherit;
    color: var(--button-color) !important;
    border: 2px solid var(--button-border-color) !important;
    border-radius: 15px;
}

button::before {
    content: '';
    width: 100%;
    height: 0;
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--button-background-color) !important;
    transition: height 0.3s ease;
    z-index: -1;
}

button:hover::before {
    height: 100%;
    top: 0;
}

button:hover {
    color: white !important;
    background-color: var(--button-color) !important;
}

button {
    --button-color: v-bind(color) !important;
    --button-background-color: v-bind(color) !important;
    --button-border-color: v-bind(color) !important;
    --button-hover-text-color: v-bind(hoverTextColor) !important;
    cursor: pointer;
}
</style>
