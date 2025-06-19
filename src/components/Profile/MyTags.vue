<script setup>
import { onMounted } from 'vue';
import { useTagsStore, useAuthStore } from '@/stores';
import { TagMultipleOutline } from '../icons';

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
    <div>
        <div class="d-flex align-center mb-4">
            <h2 class="text-h6">Minhas Tags</h2>
            <TagMultipleOutline :size="24" class="ml-2" />
        </div>

        <v-table fixed-header height="400px">
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Tag</th>
                    <th class="text-left">Data de Registro</th>
                    <th class="text-left">Última Utilização</th>
                    <th class="text-left">Utilizações</th>
                    <th class="text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tag in tagsStore.state.myTags" :key="tag.id">
                    <td>{{ tag.id }}</td>
                    <td>{{ tag.rfid }}</td>
                    <td>
                        <div class="d-flex flex-column">
                            <span class="font-weight-medium">{{ formatDate(tag.created_at) }}</span>
                            <span class="text-caption text-medium-emphasis">{{ formatTime(tag.created_at) }}</span>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex flex-column">
                            <span class="font-weight-medium">{{ formatDate(tag.last_time_used) }}</span>
                            <span class="text-caption text-medium-emphasis">{{ formatTime(tag.last_time_used) }}</span>
                        </div>
                    </td>
                    <td>
                        <v-chip :color="tag.used_times > 100 ? 'success' : 'primary'" size="small" label>
                            {{ tag.used_times }}
                        </v-chip>
                    </td>
                    <td>
                        <v-chip :color="tag.valid ? 'success' : 'error'" size="small" label>
                            {{ tag.valid ? 'Ativo' : 'Inativo' }}
                        </v-chip>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <div v-if="!tagsStore.state.myTags?.length" class="d-flex justify-center align-center pa-8">
            <v-alert type="info" text="Você ainda não possui tags cadastradas." variant="tonal"></v-alert>
        </div>
    </div>
</template>

<style scoped>
.myTags {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
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
