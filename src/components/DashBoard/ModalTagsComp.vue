<script setup>
import { ref, computed } from 'vue';
import TagMultipleOutline from 'vue-material-design-icons/TagMultipleOutline.vue';
import ModalComp from './ModalComp.vue';
import HoverButton from '../global/Buttons/HoverButton.vue';
import Magnify from 'vue-material-design-icons/Magnify.vue';

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

const orderedTags = computed(() => {
    return [...tags.value].sort((a) => {
        return a.status === 'Desativado' ? -1 : 1;
    });
});

const showModal = ref(false);
const selected = ref({});

function openModal(item) {
    selected.value = item;
    showModal.value = true;
}
</script>

<template>
    <ModalComp v-model:isOpen="showModal" :objectSelected="selected" />
    <main v-if="isOpen">
        <section>
            <div class="title">
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <TagMultipleOutline :size="70" />
                    <h2>Gerenciar Tags</h2>
                </div>
                <span>
                    <div class="search">
                        <Magnify />
                        <input type="text" />
                    </div>
                    <button class="close" @click="closeModal">X</button>
                </span>
            </div>
            <div class="list">
                <div class="headerList">
                    <p>Id da Tag</p>
                    <p>Usuario</p>
                    <p>Status</p>
                </div>
                <div v-for="(item, index) in orderedTags" :key="index" class="ItemTags">
                    <p>{{ item.id }}</p>
                    <p>{{ item.user }}</p>
                    <span>
                        <img v-if="item.status === 'Ativo'" src="/public/approved.svg" width="10%" alt="Aprovado">

                        <img v-if="item.status === 'Desativado'" src="/public/denied.svg" width="10%" alt="Desativado">
                        <p>{{ item.status }}</p>

                        <HoverButton v-if="item.status === 'Desativado'" text="Ativar" color="black"
                            hoverTextColor="white" @click="openModal(item)" />
                    </span>
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
    z-index: 1;
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

.title {
    width: 100%;
    display: flex;
    justify-content: space-between;
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


.headerList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid #ccc;
    height: 100px;
    margin: 10px auto;
    flex-direction: column;
    color: black;
    padding: .5rem 1rem;
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