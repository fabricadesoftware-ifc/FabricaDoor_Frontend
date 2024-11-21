<script setup>
import { ref, onMounted } from 'vue';
import { ModalLogsComp } from '..';
import { ArrowExpand } from '@/components/icons';
import { useLogsStore } from '@/stores';

const logsStore = useLogsStore();
const showModalLogs = ref(false);

const logs = ref([])
onMounted(async () => {
    await logsStore.getLogs();
    logs.value = logsStore.state.logs;
});

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
                <p>Data:</p>
                <p>Menssagem:</p>
            </div>
            <div v-for="(log, index) in logs" :key="index" class="ItemTags">
                <p>{{ log.date }}</p>
                <p>{{ log.message }}</p>
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
    height: 50px;
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
