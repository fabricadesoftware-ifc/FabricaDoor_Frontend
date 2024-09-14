<script setup>
import { ref, computed } from 'vue';
import ModalComp from './ModalComp.vue';
import ModalTagsComp from './ModalTagsComp.vue';
import ArrowExpand from "vue-material-design-icons/ArrowExpand.vue";

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
const showModalTags = ref(false);
const selected = ref({});

function openModal(item) {
    selected.value = item;
    showModal.value = true;
}
</script>


<template>
    <ModalComp v-model:isOpen="showModal" :objectSelected="selected" />
    <ModalTagsComp v-model:isOpen="showModalTags" />

    <article>
        <div class="title">
            Gerenciar Tags
            <ArrowExpand :size="30" @click="showModalTags = true" />
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
                <span style="display: flex; gap: .5rem; align-items: center; justify-content: space-between;">
                    <img v-if="item.status === 'Ativo'" src="/public/approved.svg" width="10%" alt="Aprovado">
                    <img v-if="item.status === 'Desativado'" src="/public/denied.svg" width="10%" alt="Desativado">
                    <p>{{ item.status }}</p>

                    <HoverButton text="Ativar" color="green" hoverTextColor="white" v-if="item.status === 'Desativado'"
                        @click="openModal(item)" />

                </span>
            </div>
        </div>
    </article>
</template>

<style scoped>
article {
    width: 100%;
    border-radius: 15px;
    border: 1px solid #ccc;
    display: flex;
    padding: 3rem;
    flex-direction: column;
    gap: 3rem;
}

.title {
    font-size: 2rem;
    font-weight: 600;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.headerList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 95%;
    color: #6d6d6d;
    padding: 0 1rem;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 500px;
    overflow-y: auto;
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

button {
    border: 0;
    padding: .5rem;
    border-radius: 15px;
    color: #fff;
    background-color: black;
    cursor: pointer;
    transition: .3s ease-in-out;
}

button:hover {
    background-color: #000000dc;
    color: #fff;
}

span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
</style>