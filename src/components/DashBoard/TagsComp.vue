<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTagsStore } from '@/stores';
import { ModalComp, ModalTagsComp } from '..';
import { ArrowExpand } from '../icons';

const tagsStore = useTagsStore();
const tags = computed(() => tagsStore.state.tags);

const orderedTags = computed(() => {
    return tags.value.slice().sort((a, b) => {
        return a.valid === b.valid ? 0 : a.valid ? -1 : 1;
    });
});

// Função para truncar RFID maior que 6 caracteres
const truncateRFID = (rfid) => {
    return rfid.length > 8 ? rfid.substring(0, 8) + '...' : rfid;
};

const showModal = ref(false);
const showModalTags = ref(false);
const selected = ref({});

onMounted(async () => {
    await tagsStore.getTags();
});
</script>

<template>
    <ModalComp v-model:isOpen="showModal" :objectSelected="selected" />
    <ModalTagsComp v-model:isOpen="showModalTags" />

    <v-card height="100%" class="d-flex flex-column">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-4">
                <v-card-title class="text-h5">
                    Gerenciar Tags
                </v-card-title>
                <v-btn icon @click="showModalTags = true">
                    <ArrowExpand :size="30" />
                </v-btn>
            </div>

            <v-table fixed-header height="400px">
                <thead>
                    <tr>
                        <th class="text-left text-on-surface">Id da Tag</th>
                        <th class="text-left text-on-surface">RFID</th>
                        <th class="text-left text-on-surface">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orderedTags" :key="item.id" @click="showModal = true; selected = item"
                        style="cursor: pointer">
                        <td class="text-on-surface">{{ item.id }}</td>
                        <td class="text-on-surface">{{ truncateRFID(item.rfid) }}</td>
                        <td>
                            <v-chip :color="item.valid ? 'success' : 'error'" size="small" class="text-on-surface">
                                <template v-slot:prepend>
                                    <v-icon :icon="item.valid ? 'mdi-check-circle' : 'mdi-close-circle'" size="small" />
                                </template>
                                {{ item.valid ? 'Ativo' : 'Desativado' }}
                            </v-chip>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-item>
    </v-card>
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
    grid-template-columns: 1fr 1.5fr 1fr;
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
    grid-template-columns: 1fr 1.5fr 1fr;
    border-bottom: 1px solid #ccc;
    height: 60px;
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

@media screen and (max-width: 1024px) {
    article {
        padding: 1rem;
        width: 100%;
    }

    .ItemTags {
        grid-template-columns: 1fr 1.5fr 1fr;
    }

    .headerList {
        grid-template-columns: 1fr 1.5fr 1fr;
        position: sticky;
        top: 0;
        width: 100%;
        padding: 0;
    }

    .list {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .list::-webkit-scrollbar {
        display: none;
    }
}
</style>
