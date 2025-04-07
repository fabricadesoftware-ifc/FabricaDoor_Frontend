<script setup>
import { useStyleStore } from "@/stores";

const store = useStyleStore();

defineEmits(['click']);
defineProps({
    text: String,
    color: String,
    hoverTextColor: String
});
</script>

<template>
  <button
    v-if="store.localUser.textColor === '#131316'"
    @click="$emit('click')"
    :style="{ borderColor: '#131316' }"
    class="modo-claro"
  >
    {{ text }}
  </button>

  <button
    v-else
    @click="$emit('click')"
    :style="{ borderColor: 'white' }"
    class="modo-escuro"
  >
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
  transition: color 0.3s ease, background-color 0.3s ease;
  font-family: inherit;
  border: 2px solid;
  border-radius: 15px;
  cursor: pointer;
}

/* Estilo do botão no modo escuro */
.modo-claro {
  color: #131316;
  background-color: white;
}

.modo-claro:hover {
  background-color: #131316;
  color: white;
}

/* Estilo do botão no modo claro */
.modo-escuro {
  color: white;
  background-color: #131316;
}

.modo-escuro:hover {
  background-color: white;
  color: #131316;
}
</style>
