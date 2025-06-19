<script setup>
import { ref, onMounted } from 'vue';
import { ModalLogsComp } from '..';
import { ArrowExpand } from '@/components/icons';
import { useLogsStore } from '@/stores';

const logsStore = useLogsStore();
const showModalLogs = ref(false);
const logs = ref([]);

const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('pt-BR', options);
};

onMounted(async () => {
    await logsStore.getLogs();
    logs.value = logsStore.state.logs.map(log => ({
        ...log,
        formattedDate: formatDateTime(log.date)
    }));
});
</script>

<template>
    <ModalLogsComp v-model:isOpen="showModalLogs" />

    <v-card height="100%" class="d-flex flex-column">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-4">
                <div class="d-flex align-center">
                    <v-avatar color="primary" class="mr-4">
                        <v-icon>mdi-history</v-icon>
                    </v-avatar>
                    <v-card-title class="text-h5">
                        Logs de Acesso Recentes
                    </v-card-title>
                </div>
                <v-btn icon variant="text" @click="showModalLogs = true">
                    <ArrowExpand :size="30" />
                </v-btn>
            </div>

            <v-table fixed-header height="400px">
                <thead>
                    <tr>
                        <th class="text-left text-on-surface">
                            Data
                        </th>
                        <th class="text-left text-on-surface">
                            Mensagem
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(log, index) in logs" :key="index" class="log-row">
                        <td class="text-on-surface">{{ log.formattedDate }}</td>
                        <td class="text-on-surface">{{ log.message }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-item>
    </v-card>
</template>

<style scoped>
.log-row {
    transition: background-color 0.2s ease;
}

.log-row:hover {
    background-color: var(--v-hover-color);
}

.v-table {
    border-radius: 16px;
    overflow: hidden;
}

:deep(.v-table__wrapper) {
    border-radius: 16px;
}

:deep(.v-table > .v-table__wrapper > table > thead > tr > th) {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.025em;
    background-color: var(--v-surface-variant-color);
}
</style>
