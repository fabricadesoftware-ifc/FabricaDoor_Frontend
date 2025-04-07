<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Magnify, NoteTextOutline } from '../icons';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};

const logs = ref([
  { id: 1, user: 'user1', hora: '08:30', dia: '07', ano: '2025' },
  { id: 2, user: 'user2', hora: '09:15', dia: '07', ano: '2025' },
  { id: 3, user: 'user3', hora: '10:45', dia: '06', ano: '2025' },
  { id: 4, user: 'user4', hora: '11:20', dia: '06', ano: '2025' },
  { id: 5, user: 'user5', hora: '14:10', dia: '05', ano: '2025' },
  { id: 5, user: 'user5', hora: '14:10', dia: '05', ano: '2025' },
  { id: 5, user: 'user5', hora: '14:10', dia: '05', ano: '2025' },
  { id: 5, user: 'user5', hora: '14:10', dia: '05', ano: '2025' },
  { id: 5, user: 'user5', hora: '14:10', dia: '05', ano: '2025' },
  { id: 5, user: 'user5', hora: '14:10', dia: '05', ano: '2025' },
  { id: 5, user: 'user5', hora: '14:10', dia: '05', ano: '2025' },
]);

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

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  window.addEventListener('keydown', handleEscKey);
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
        <div v-for="(log, index) in logs" :key="index" class="log-card">
          <div class="card-content">
            <p><strong>ID da Tag:</strong> {{ log.id }}</p>
            <p><strong>Usuário:</strong> {{ log.user }}</p>
            <p><strong>Hora:</strong> {{ log.hora }}</p>
            <p><strong>Dia:</strong> {{ log.dia }}</p>
            <p><strong>Ano:</strong> {{ log.ano }}</p>
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
