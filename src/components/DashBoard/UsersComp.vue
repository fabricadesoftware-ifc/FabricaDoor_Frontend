<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { ModalUserComp, HoverButton, ModalAddUser } from '..';
import { useUsersStore } from '@/stores';
import { Cancel, Magnify, Account, CheckCircle } from '../icons';

const iconComponents = { CheckCircle, Cancel };

const usersStore = useUsersStore();
const showModalUser = ref(false);
const showModalAddUser = ref(false);
const selected = ref({});
const searchTerm = ref('');
const screenWidth = ref(window.innerWidth);

function openModalUser(data) {
    showModalUser.value = true;
    selected.value = data;
}

const closeModal = () => {
    showModalUser.value = false;
    showModalAddUser.value = false;
};

const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscapeKey);
    window.removeEventListener('resize', updateScreenWidth);
});

const filteredUsers = computed(() => {
    if (!searchTerm.value) return usersStore.state.users.data?.users || [];
    return usersStore.state.users.data?.users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) || [];
});
</script>

<template>
    <ModalUserComp v-model:isOpen="showModalUser" :object-selected="selected" />
    <ModalAddUser v-model:isOpen="showModalAddUser" />

    <section>
        <div class="title">
            <h2>Usuários:
                <Account />
            </h2>
            <div class="search">
                <input type="text" placeholder="Buscar..." v-model="searchTerm" />
            </div>
            <span>
                <HoverButton text="Adicionar +" :color="'black'" :hover-text-color="'white'"
                    @click="showModalAddUser = !showModalAddUser" />
            </span>
        </div>

        <div class="card-grid">
            <div v-for="user in filteredUsers" :key="user.id" class="user-card">
                <div class="card-content">
                    <p><strong>ID:</strong> {{ user.id }}</p>
                    <p><strong>Nome:</strong> {{ user.name }}</p>
                    <div class="user-status">
                        <p><strong>Super Usuário:

                            </strong>
                            <component :is="iconComponents[user.isSuper ? 'CheckCircle' : 'Cancel']" width="20"
                                height="20" />
                            {{ user.isSuper ? 'Sim' : 'Não' }}
                        </p>
                        <p><strong>Verificado:</strong>
                            <component :is="iconComponents[user.isVerified ? 'CheckCircle' : 'Cancel']" width="20"
                                height="20" />
                            {{ user.isVerified ? 'Sim' : 'Não' }}
                        </p>
                    </div>
                </div>
                <div class="card-buttons">
                    <HoverButton text="Editar" :color="'black'" :hover-text-color="'green'"
                        @click="openModalUser(user)" />
                </div>
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
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #ccc;
}

.title {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.title h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-height: 400px;
    overflow-y: auto;
}

.user-card {
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
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.user-status {
    display: flex;
    gap: 1rem;
}

.user-status p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card-buttons {
    display: flex;
    gap: 0.5rem;
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

@media screen and (max-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
        max-height: 400px;
        overflow-y: auto;
        scrollbar-width: none;
    }

    .card-grid::-webkit-scrollbar {
        display: none; 
    }

    .title {
        flex-direction: column;
        align-items: flex-start;
    }

    .user-status {
        flex-direction: column;
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
}
</style>
