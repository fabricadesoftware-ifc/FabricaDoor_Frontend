<script setup>
import { computed } from 'vue';
import { useLogsStore } from '@/stores';

const logsStore = useLogsStore();

const recentLogs = computed(() => {
    return logsStore.state.logs.slice(0, 15).map(log => ({
        ...log,
        formattedDate: formatDateTime(log.date),
    }));
});

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}
</script>

<template>
    <v-card height="100%" class="d-flex flex-column">
        <v-card-item class="pb-0">
            <div class="d-flex justify-space-between align-center mb-4">
                <div class="d-flex align-center">
                    <v-avatar color="primary" class="mr-4">
                        <v-icon>mdi-history</v-icon>
                    </v-avatar>
                    <div>
                        <v-card-title class="text-h5 pa-0">Logs de Acesso</v-card-title>
                        <p class="text-caption text-medium-emphasis">Últimos 15 registros</p>
                    </div>
                </div>
                <v-chip size="small" color="primary" variant="tonal">
                    {{ logsStore.state.logs.length }} total
                </v-chip>
            </div>
        </v-card-item>

        <v-card-text class="flex-grow-1 pt-0">
            <template v-if="logsStore.state.loading">
                <v-skeleton-loader type="table-row@5" />
            </template>

            <template v-else-if="recentLogs.length === 0">
                <div class="d-flex flex-column align-center justify-center py-12 text-center">
                    <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-clipboard-text-clock-outline</v-icon>
                    <p class="text-h6 text-medium-emphasis">Nenhum log encontrado</p>
                    <p class="text-body-2 text-medium-emphasis">Os registros de acesso aparecerão aqui</p>
                </div>
            </template>

            <template v-else>
                <v-table fixed-header height="380px" density="comfortable">
                    <thead>
                        <tr>
                            <th class="text-left text-on-surface font-weight-bold">Data</th>
                            <th class="text-left text-on-surface font-weight-bold">Mensagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(log, index) in recentLogs" :key="index" class="log-row">
                            <td class="text-on-surface text-no-wrap">
                                <v-icon size="14" class="mr-1" color="primary">mdi-clock-outline</v-icon>
                                {{ log.formattedDate }}
                            </td>
                            <td class="text-on-surface">{{ log.message }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </template>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.log-row {
    transition: background-color 0.2s ease;
}

.log-row:hover {
    background-color: rgba(var(--v-theme-primary), 0.04);
}

:deep(.v-table > .v-table__wrapper > table > thead > tr > th) {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
</style>
