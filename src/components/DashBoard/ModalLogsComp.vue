<script setup>
import {  onMounted, onUnmounted } from 'vue';
import { Magnify, NoteTextOutline } from '../icons';
import { useLogsStore } from '@/stores';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isOpen: Boolean,
});

const logsStore = useLogsStore();

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};

const handleClickOutside = (event) => {
  if (event.target.closest('section') === null) {
    closeModal();
  }
};

const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

onMounted(async() => {
  window.addEventListener('click', handleClickOutside);
  window.addEventListener('keydown', handleEscKey);

  await logsStore.getLogs();
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
  window.removeEventListener('keydown', handleEscKey);
});
</script>

<template>
  <main v-if="isOpen">
    <section>
      <div class="title">
        <div class="header">
          <NoteTextOutline :size="70" />
          <h2>Gerenciar Logs</h2>
        </div>
        <span>
          <div class="search">
            <Magnify />
            <input type="date" />
          </div>
          <button class="close" @click="closeModal">X</button>
        </span>
      </div>

      <div class="card-grid">
        <div v-for="(log, index) in logsStore.state.logs" :key="index" class="log-card">
          <div class="card-content">
            <p><strong>ID da Tag:</strong> {{ log.id }}</p>
            <p><strong>ID da Tag:</strong> {{ log.type }}</p>
            <p><strong>ID da Tag:</strong> {{ log.message }}</p>
            <p><strong>ID da Tag:</strong> {{ log.date }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000083;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 50;
  backdrop-filter: blur(5px);
}

section {
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 15px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0 #00000083;
  z-index: 1;
  overflow-y: auto;
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header {
  display: flex;
  gap: 1rem;
  align-items: center;
}

span {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.close {
  background-color: transparent;
  border: 0;
  font-size: 2rem;
  color: #6d6d6d;
  cursor: pointer;
}

.search {
  display: flex;
  padding: .5rem 0;
  border-radius: 15px;
}

.search input {
  border: 2px solid #ccc;
  padding: .5rem;
  border-radius: 15px;
  outline: none;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  overflow-y: auto;
}

.log-card {
  /* background-color: #f9f9f9; */
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media screen and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  section {
    width: 90%;
    padding: 2rem 1rem;
  }

  .search input {
    width: 100%;
  }

  .close {
    font-size: 1.5rem;
  }
}
</style>
