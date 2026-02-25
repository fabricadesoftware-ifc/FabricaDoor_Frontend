<script setup>
import { watch, onMounted } from 'vue';
import { useStyleStore } from './stores';
import LoadingComp from './components/global/Cards/LoadingComp.vue';
import { useTheme } from 'vuetify';

const store = useStyleStore();
const theme = useTheme();

function updateTheme() {
  if (store.localUser) {
    theme.global.name.value = store.localUser.textColor === '#131316' ? 'light' : 'dark';
  }
}

watch(() => store.localUser.textColor, updateTheme);

onMounted(async () => {
  updateTheme();
});
</script>

<template>
  <v-app>
    <v-main>
      <LoadingComp :img="store.localUser.image" />
      <RouterView />
    </v-main>
  </v-app>
</template>

