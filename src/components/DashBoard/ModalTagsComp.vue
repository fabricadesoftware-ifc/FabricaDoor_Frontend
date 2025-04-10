<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ModalComp, HoverButton, AssignUserTagComp } from '..';
import { TagMultipleOutline } from '../icons';
import { useTagsStore } from '@/stores';

const tagsStore = useTagsStore();

const tags = computed(() => tagsStore.state.tags);
const searchTerm = ref("");

const filteredTags = computed(() => {
    return [...tags.value]
        .filter(tag => {
            const term = searchTerm.value.toLowerCase();
            const rfidMatch = tag.rfid?.toLowerCase().includes(term);
            const userNameMatch = tag.user?.name?.toLowerCase().includes(term);
            return rfidMatch || userNameMatch;
        })
        .sort((a, b) => b.valid - a.valid);
});

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
    emit("update:isOpen", false);
};

const showModal = ref(false);
const showModalTags = ref(false);
const selected = ref({});

const closeOnBackdrop = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
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

function openModalValid(item) {
    selected.value = item;
    showModal.value = true;
}

function openModalTag(item) {
    selected.value = item;
    showModalTags.value = true;
}
</script>

<template>
    <ModalComp v-model:isOpen="showModal" :objectSelected="selected" />
    <AssignUserTagComp v-model:isOpen="showModalTags" :object-selected="selected" />

    <main v-if="isOpen" @click="closeOnBackdrop">
        <section>
            <div class="title">
                <div class="header">
                    <TagMultipleOutline :size="70" />
                    <h2>Gerenciar Tags</h2>
                </div>
                <span>
                    <div class="search">
                        <input type="text" v-model="searchTerm" placeholder="Pesquisar por RFID ou nome do usuário" />
                    </div>
                    <button class="close" @click="closeModal">X</button>
                </span>
            </div>

            <div class="card-grid">
                <div v-for="(item, index) in filteredTags" :key="index" class="tag-card">
                    <div class="card-content">
                        <p><strong>ID:</strong> {{ item.id }}</p>
                        <p><strong>Usuário:</strong> {{ item.user?.name || "Não Atribuido" }}</p>
                        <p><strong>RFID:</strong> {{ item.rfid }}</p>

                        <div class="status">
                            <img v-if="item.valid" src="/public/approved.svg" width="20" alt="Aprovado">
                            <img v-else src="/public/denied.svg" width="20" alt="Desativado">
                            <span>{{ item.valid ? 'Ativo' : 'Desativado' }}</span>
                        </div>
                    </div>
                    <div class="card-buttons">
                        <HoverButton v-if="!item.valid && !item.user" text="Atribuir" color="black"
                            hoverTextColor="white" @click="openModalTag(item)" />

                        <HoverButton v-else-if="item.valid && !item.user" text="Atribuir" color="black"
                            hoverTextColor="white" @click="openModalTag(item)" />

                        <HoverButton v-else-if="item.valid && item.user" text="Desativar" color="black"
                            hoverTextColor="white" @click="openModalValid(item)" />

                        <HoverButton v-else-if="!item.valid && item.user" text="Ativar" color="black"
                            hoverTextColor="white" @click="openModalValid(item)" />
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

.header {
    display: flex;
    gap: 1rem;
    align-items: center;
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

.tag-card {
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

.status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

@media screen and (max-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 600px) {
    .card-grid {
        grid-template-columns: 1fr;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .card-grid::-webkit-scrollbar {
        display: none;
    }

    .title {
        align-items: center;
        justify-content: center;
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
