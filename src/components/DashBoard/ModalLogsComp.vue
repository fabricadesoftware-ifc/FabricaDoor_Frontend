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

const tags = ref([
  { id: 1, user: 'user1', status: 'Desativado' },
  { id: 2, user: 'user2', status: 'Ativo' },
  { id: 3, user: 'user3', status: 'Ativo' },
  { id: 4, user: 'user4', status: 'Ativo' },
  { id: 5, user: 'user5', status: 'Ativo' },
  { id: 6, user: 'user6', status: 'Desativado' },
  { id: 7, user: 'user7', status: 'Desativado' },
  { id: 8, user: 'user8', status: 'Ativo' },
  { id: 9, user: 'user9', status: 'Ativo' },
  { id: 10, user: 'user10', status: 'Desativado' },
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

// Add event listeners when the component is mounted
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  window.addEventListener('keydown', handleEscKey);
});

// Remove event listeners when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
  window.removeEventListener('keydown', handleEscKey);
});
</script>

<template>
    <main v-if="isOpen">
        <section>
            <div class="title">
                <div style="display: flex; gap: 1rem; align-items: center;">

                    <NoteTextOutline :size="70" />
                    <h2>Gerenciar Logs
                    </h2>
                </div>
                <span>
                    <div class="search">
                        <Magnify />
                        <input type="date" />
                    </div>
                    <button class="close" @click="closeModal">X</button>
                </span>
            </div>
            <div class="list">
                <div class="headerList">
                    <p>Id da Tag</p>
                    <p>Usuario</p>
                    <p>Hora</p>
                    <p>Dia</p>
                    <p>Ano</p>
                </div>
                <div v-for="(item, index) in tags" :key="index" class="ItemTags">
                    <p>{{ item.id }}</p>
                    <p>{{ item.user }}</p>
                    <p>{{ item.id }}</p>
                    <p>{{ item.user }}</p>
                    <p>{{ item.id }}</p>
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
    z-index: 10;
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
    gap: 1rem;
    justify-content: space-between;
    box-shadow: 0 0 10px 0 #00000083;
    z-index: 1;
}

.search {
    display: flex;
    padding: .5rem 0;
    border-radius: 15px;
}

.search>span {
    z-index: 15;
    border-radius: 15px 0px 0px 15px;
    border-top: 2px solid #ccc;
    border-left: 2px solid #ccc;
    border-right: none;
    border-bottom: 2px solid #ccc;
    padding-left: .5rem;
}

.search>input {
    /* border: 2px solid #ccc; */
    border-top: 2px solid #ccc;
    border-left: none;
    border-right: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    padding: .5rem;
    border-radius: 0px 15px 15px 0px;
}

.search>input:focus {
    outline: none;
}

.title {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

span {
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
}

.close {
    background-color: transparent;
    border: 0;
    font-size: 2rem;
    color: #6d6d6d;
    cursor: pointer;
}

.headerList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 55%;
    color: #6d6d6d;
    padding: 0 1rem;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    border-bottom: 1px solid #ccc;
    z-index: 1;

}

.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 450px;
    overflow-y: auto;
    width: 100%;
    position: relative;
}

.ItemTags {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    border-bottom: 1px solid #ccc;
    height: 100px;
    margin: 10px auto;
    flex-direction: column;
    color: black;
    padding: .5rem 1rem;
    align-items: center;
}
</style>