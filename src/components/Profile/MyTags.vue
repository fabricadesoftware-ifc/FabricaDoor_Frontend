<script setup>
import { onMounted } from 'vue';
import { useTagsStore, useAuthStore } from '@/stores';
import TagMultipleOutline from 'vue-material-design-icons/TagMultipleOutline.vue';
const tagsStore = useTagsStore();
const authStore = useAuthStore();

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

onMounted(async () => {
    await tagsStore.getMyTags(authStore.authUser.user.id);
});
</script>

<template>
    <h2>Minhas Tags:
        <component :is="TagMultipleOutline" :size="30" />
    </h2>
    <article class="myTags">
        <div class="headerList">
            <p>ID:</p>
            <p>Tag:</p>
            <p>Data de Registro:</p>
            <p>Ultima Vez Usada:</p>
            <p>Vezes Usadas:</p>
            <p>Status:</p>
        </div>
        <div class="list">
            <div v-for="tag in tagsStore.state.myTags" :key="tag.id" class="itemList">
                <p>{{ tag.id }}</p>
                <p>{{ tag.rfid }}</p>
                <p class="date">
                    <span> {{ formatDate(tag.created_at) }}
                    </span>
                    <span> {{ formatTime(tag.created_at) }}
                    </span>
                </p>
                <p class="date">
                    <span> {{ formatDate(tag.last_time_used) }}
                    </span>
                    <span>
                        {{ formatTime(tag.last_time_used) }}
                    </span>
                </p>
                <p>{{ tag.used_times }}</p>
                <p>{{ tag.valid }}</p>
            </div>
        </div>
    </article>
</template>

<style scoped>
.myTags {
    width: 90%;
    margin: 0 auto;
    height: 3vh;
    display: flex;
    flex-direction: column;
    height: 30vh;
}

h2 {
    font-size: 1.5rem;
    padding: 1rem;
    display: flex;
    gap: .5rem;
    width: 90%;
    margin: auto;
}

.headerList {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    font-size: 80%;
}

.list {
    display: grid;
}

.itemList {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    font-size: 80%;
}

.date {
    display: flex;
    flex-direction: column;
}

.date span {
    display: block;
}

.date span:first-child {
    font-weight: 600;
}

span {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 1024px) {
    .myTags {
        flex-direction: row;
    }

    .headerList {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, 1fr);
        border: 0;
    }

   

    .itemList {
        
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, 1fr);
        border: 0;
    }

   
}
</style>
