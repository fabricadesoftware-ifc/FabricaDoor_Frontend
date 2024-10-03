<script setup>
import { ref, computed } from 'vue';
import { useTagsStore } from '@/stores';
import ModalComp from './ModalComp.vue';
import ModalTagsComp from './ModalTagsComp.vue';
import ArrowExpand from "vue-material-design-icons/ArrowExpand.vue";
// import { storeToRefs } from 'pinia';

const tagsStore = useTagsStore();

const tags = computed(() => tagsStore.state.tags);

// // Ordenar as tags com base no campo 'valid'
// const orderedTags = computed(() => {
//     return [tags.value].sort((a, b) => {
//         // Coloque as tags válidas (active) no topo
//         if (a.valid === b.valid) return 0;
//         return a.valid ? -1 : 1;
//     });
// });

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
                <p>RFID</p>
                <p>Status</p>
            </div>

            <div v-for="(item) in tags" :key="item.id" class="ItemTags">
                <p>{{ item.id }}</p>
                <p>{{ item.rfid }}</p>

                <span style="display: flex; gap: .5rem; align-items: center">
                    <img v-if="item.valid" src="/public/approved.svg" width="10%" alt="Aprovado">
                    <img v-if="!item.valid" src="/public/denied.svg" width="10%" alt="Desativado">
                    <p>{{ item.valid ? 'Ativo' : 'Desativado' }}</p>

                    <HoverButton text="Ativar" color="green" hoverTextColor="white" v-if="!item.valid"
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
    width: 95%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid #ccc;
    height: 50px;
    flex-direction: column;
    color: black;
    padding: 0rem 1rem;
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
    cursor: pointer;
}
</style>
