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

const isMobile = computed(() => screenWidth.value < 768);
</script>

<template>
    <ModalUserComp v-model:isOpen="showModalUser" :object-selected="selected" />
    <ModalAddUser v-model:isOpen="showModalAddUser" />
    
    <template v-if="isMobile">
        <div class="showUsersTitle">
            <h1>Usuários</h1>
        </div>
    </template>
    <section>
        <div class="title">
            <h2>Usuários:
                <Account />
                <div class="search">
                    <Magnify v-if="!isMobile" />
                    <input type="text" placeholder="Buscar..." v-model="searchTerm" />
                </div>
            </h2>
            <span>
                <HoverButton text="Adicionar" :color="'black'" :hover-text-color="'white'"
                    @click="showModalAddUser = !showModalAddUser" />
            </span>
        </div>

        <div class="user-list">
            <template v-if="!isMobile">
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
                        <component :is="iconComponents[user.isSuper ? 'CheckCircle' : 'Cancel']" width="20"
                            height="20" />
                        {{ user.isSuper ? 'Sim' : 'Não' }}
                    </p>
                    <p style="display: flex; align-items: center; gap: 0.5rem;">
                        <component :is="iconComponents[user.isVerified ? 'CheckCircle' : 'Cancel']" width="20"
                            height="20" />
                        {{ user.isVerified ? 'Sim' : 'Não' }}
                    </p>
                    <p class="buttons">
                        <HoverButton text="Editar" :color="'black'" :hover-text-color="'green'"
                            @click="openModalUser(user)" />
                    </p>
                </div>
            </template>

            <template v-else>
                <div v-for="user in filteredUsers" :key="user.id" class="user-card">
                    <p><strong>Nome:</strong> {{ user.name }}</p>
                    <p style="display: flex; gap: .5rem;"><strong>Email:</strong> {{ user.email }}</p>
                    <p style="display: flex; gap: .5rem;"><strong>Super Usuário:</strong>
                        <component :is="iconComponents[user.isSuper ? 'CheckCircle' : 'Cancel']" width="20"
                            height="20" />
                        {{ user.isSuper ? ' Sim' : ' Não' }}
                    </p>
                    <p style="display: flex; gap: .5rem;"><strong>Verificado:</strong>
                        <component :is="iconComponents[user.isVerified ? 'CheckCircle' : 'Cancel']" width="20"
                            height="20" />
                        {{ user.isVerified ? ' Sim' : ' Não' }}
                    </p>
                    <div class="buttons">
                        <HoverButton text="Editar" :color="'black'" :hover-text-color="'green'"
                            @click="openModalUser(user)" />
                    </div>
                </div>
            </template>
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

.showUsersTitle{
    width: 90%;
    margin: 20px auto;
}

.showUsersTitle h1{
    font-size: 1.5rem;
    font-weight: 600;
    /* color: #6d6d6d; */
    display: flex;
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

.user-card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 1rem;
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

.search>input {
    border: 2px solid #ccc;
    padding: .5rem;
    border-radius: 15px;
}

.search>input:focus {
    outline: none;
}

@media (max-width: 768px) {
    section {
        width: 90%;
        margin-top: 5px;
    }

    .user-list {
        display: flex;
        flex-direction: column;
    }

    .title {
        flex-direction: column;
        gap: 1rem;
    }

    .title>span:nth-child(2) {
        width: 100%;
        display: flex;
        justify-content: start;
    }

    .title>h2 {
        gap: 1rem;
    }

    .search>input {
        width: 100%;
    }

    .user-card p {
        display: flex;
        gap: .5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .user-card p strong {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

}
</style>
