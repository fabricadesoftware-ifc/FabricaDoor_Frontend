<script setup>
import { ref } from 'vue';
import ArrowExpand from "vue-material-design-icons/ArrowExpand.vue";
import ModalLogsComp from './ModalLogsComp.vue';

const showModalLogs = ref(false);

const tags = ref([
    { hora: 1, user: 'user1', },
    { hora: 2, user: 'user2', },
    { hora: 3, user: 'user3', },
    { hora: 4, user: 'user4', },
    { hora: 5, user: 'user5', },
    { hora: 6, user: 'user6', },
    { hora: 7, user: 'user7', },
    { hora: 8, user: 'user8', },
    { hora: 9, user: 'user9', },
    { hora: 10, user: 'user10', },
]);

</script>

<template>
    <ModalLogsComp v-model:isOpen="showModalLogs" />
    <article>
        <div class="title">
            Logs de Acesso Recentes
            <ArrowExpand :size="30" @click="showModalLogs = true" />
        </div>

        <div class="list">
            <div class="headerList">
                <p>Hora:</p>
                <p>Usuario:</p>
            </div>
            <div v-for="(item, index) in tags" :key="index" class="ItemTags">
                <p>{{ item.hora }}</p>
                <p>{{ item.user }}</p>
                <span style="display: flex; gap: .5rem;">
                    <p>{{ item.status }}</p>
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

span{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.headerList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
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
    grid-template-columns: 1fr 1fr;
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
</style>
