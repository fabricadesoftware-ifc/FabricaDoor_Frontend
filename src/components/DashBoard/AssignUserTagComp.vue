<script setup>
import { onMounted, onBeforeUnmount, reactive, watch } from 'vue';
import { useUsersStore } from '@/stores';
import { HoverButton } from '..';
import { AlertOutline } from '../icons';
import { useTagsStore } from '@/stores';

const usersStore = useUsersStore();
const tagsStore = useTagsStore();

const props = defineProps({
  isOpen: Boolean,
  objectSelected: Object,
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscapeKey);
});

const closeOnBackdrop = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const data = reactive({
  rfid: null,
  userId: 0,
});

watch(
  () => props.objectSelected,
  (newVal) => {
    data.rfid = String(newVal?.rfid) || null;
  },
  { immediate: true }
);
</script>
<template>
  <main v-if="isOpen" @click="closeOnBackdrop">
    <section>
      <div style="display: flex; justify-content: space-between; flex-direction: column; gap: 1.5rem;">
        <div class="text">
          <div class="title">
            <span>
              <AlertOutline :size="30" />
              <h2 style="font-size: 1rem;">Atribuir Uma Tag</h2>
            </span>
            <button class="close" @click="closeModal">X</button>
          </div>
          <div class="subtitle">
            <p>Você está prestes a atribuir uma tag a alguém. Por favor, confirme os detalhes abaixo.</p>
          </div>
        </div>
        <div class="info">
          <p>Id da Tag: <span>{{ objectSelected.id }}</span></p>
          <p>RFID: <span>{{ objectSelected.rfid }}</span></p>
          <p>Status:
            <span>
              <input type="checkbox" /> Ativo
            </span>
          </p>
          <p>
            Usuário:
            <span>
              <select v-model="data.userId">
                <option v-for="item in usersStore.state.users?.data.users" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </span>
          </p>
        </div>
      </div>
      <div class="buttons">
        <HoverButton text="Excluir" color="red" hoverTextColor="white"
          @click="tagsStore.deleteTags(props.objectSelected?.id)" />
        <HoverButton text="Confirmar" color="green" hoverTextColor="white" @click="tagsStore.assignTag(data)" />

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
  z-index: 200 !important;
  backdrop-filter: blur(5px);
}

section {
  width: 30%;
  height: 50%;
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  box-shadow: 0 0 10px 0 #00000083;
  z-index: 300;
}

button.close {
  width: 10%;
  border: 0;
  background-color: transparent;
  font-size: 1.5rem;
  color: #6d6d6d;
  cursor: pointer;
}

.subtitle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6d6d6d;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.info>p {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: 500;
}

p>span {
  font-weight: 400;
}

@media screen and (max-width: 1024px) {
  section {
    width: 70%;
  }
  
}
</style>
