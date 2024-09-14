<script setup>
defineProps({
    text: String,
    color: String, // Cor da borda e do preenchimento no hover
    hoverTextColor: String // Cor do texto no hover
});
</script>

<template>
    <button :style="{ borderColor: color  }">
        {{ text }}
    </button>
</template>

<style scoped>
button {
    padding: 0.4em 1.2em;
    position: relative;
    overflow: hidden;
    background-color: transparent;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    transition: .3s;
    /* z-index: 1; */
    font-family: inherit;
    color: var(--button-color) !important;
    border: 2px solid var(--button-border-color) !important;
    border-radius: 15px;
}

button::before {
    content: '';
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: var(--button-background-color) !important;
    transition: .2s ease;
    display: block;
    z-index: -1;
}

button:hover::before {
    width: 105%;
}

button:hover {
    color: var(--button-hover-text-color) !important;
    /* Cor do texto no hover */
}

:host {
    --button-color: #17C3B2;
    --button-background-color: #17C3B2;
    --button-border-color: #17C3B2;
    --button-hover-text-color: #111;
}

button {
    --button-color: v-bind(color) !important;
    --button-background-color: v-bind(color) !important;
    --button-border-color: v-bind(color) !important;
    --button-hover-text-color: v-bind(hoverTextColor) !important;
    cursor: pointer;
}

</style>
