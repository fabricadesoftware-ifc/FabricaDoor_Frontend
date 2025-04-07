<script setup>
import { watch, onMounted } from 'vue';
import { useStyleStore } from './stores';
import DarkLight from './components/global/Buttons/DarkLight.vue';
import LoadingComp from './components/global/Cards/LoadingComp.vue';

const store = useStyleStore();

function updateGlobalStyles() {
  if (store.localUser) {
    document.documentElement.style.setProperty('--global-text-color', store.localUser.textColor);
    document.documentElement.style.setProperty('--global-bg-color', store.localUser.backgroundColor);
  }
}

watch(() => store.localUser.textColor, updateGlobalStyles);
watch(() => store.localUser.backgroundColor, updateGlobalStyles);

function changeColor() {
  if (store.localUser.textColor == '') {
    store.whiteMode();
    console.log("White mode");
  } else if (store.localUser.textColor === "#131316") {
    store.darkMode();
    console.log("Dark mode");
  } else {
    store.whiteMode();
    console.log("White mode");
  }
}

onMounted(async () => {
  updateGlobalStyles();
});


</script>

<template>
  <!-- <DarkLight @click="changeColor" /> -->
  <LoadingComp :img="store.localUser.image" :bgcolor="store.localUser.backgroundColor" />
  <RouterView />
</template>

<style>
* {
  color: var(--global-text-color);
  background-color: var(--global-bg-color);
}

a {
  color: var(--global-text-color);
}

h1,
h2,
h3,
p,
span {
  color: var(--global-text-color);
}

section {
  background-color: var(--global-bg-color) !important;
}

::-webkit-scrollbar-thumb {
  background-color: var(--global-bg-color);
  border: 2px solid var(--global-text-color);
}

.headerList {
  background-color: var(--global-bg-color);
  color: var(--global-text-color);
}
</style>
