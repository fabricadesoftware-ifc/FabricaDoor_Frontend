<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { ModalUserComp, HoverButton } from '..';
import { useUsersStore } from '@/stores';
import { Cancel, Magnify, Account, CheckCircle } from '../icons';

const iconComponents = { CheckCircle, Cancel };

const usersStore = useUsersStore();
const showModal = ref(false);
const selected = ref({});
const searchTerm = ref('');

function openModal(data) {
    showModal.value = true;
    selected.value = data;
}

const closeModal = () => {
    showModal.value = false;
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

const filteredUsers = computed(() => {
    if (!searchTerm.value) return usersStore.state.users.data?.users || [];
    return usersStore.state.users.data?.users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) || [];
});
</script>

<template>
    <ModalUserComp v-model:isOpen="showModal" :object-selected="selected" />

    <section>
        <div class="title">
            <h2>Usuários:
                <Account />
            </h2>
            <span>
                <div class="search">
                    <Magnify />
                    <input type="text" placeholder="Buscar..." v-model="searchTerm" />
                </div>
            </span>
        </div>

        <div class="user-list">
            <div class="headerList">
                <p>ID</p>
                <p>Nome</p>
                <p>Email</p>
                <p>Super Usuário</p>
                <p>Verificado</p>
                <p>Ações</p>
            </div>

            <div v-for="user in filteredUsers" :key="user.id" class="user-item">
                <p>{{ user.id }}</p>
                <p>{{ user.name }}</p>
                <p>{{ user.email }}</p>
                <p style="display: flex; align-items: center; gap: 0.5rem;">
                    <component :is="iconComponents[user.isSuper ? 'CheckCircle' : 'Cancel']" width="20" height="20" />
                    {{ user.isSuper ? 'Sim' : 'Não' }}
                </p>
                <p style="display: flex; align-items: center; gap: 0.5rem;">
                    <component :is="iconComponents[user.isVerified ? 'CheckCircle' : 'Cancel']" width="20"
                        height="20" />
                    {{ user.isVerified ? 'Sim' : 'Não' }}
                </p>
                <p class="buttons">
                    <HoverButton text="Editar" :color="'black'" :hover-text-color="'green'" @click="openModal(user)" />
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    margin: 2rem auto;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 10px;
    max-height: 500px;
    overflow-y: auto;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h2 {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-list {
    width: 100%;
}

.headerList {
    display: grid;
    grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 1fr;
    font-weight: bold;
    color: #6d6d6d;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 0;
    position: sticky;
    top: -17px;
    left: 0;
    z-index: 1;
    width: 100%;
}

.user-item {
    display: grid;
    grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 1fr;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
}

.buttons {
    display: flex;
    gap: 0.5rem;
}

span {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.search {
    display: flex;
    padding: .5rem 0;
    border-radius: 15px;
}

.search>span {
    z-index: 10;
    border-radius: 15px 0px 0px 15px;
    border-top: 2px solid #ccc;
    border-left: 2px solid #ccc;
    border-right: none;
    border-bottom: 2px solid #ccc;
    padding-left: .5rem;
}

.search>input {
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
</style>
