<script setup>
import { useLogsStore } from '@/stores'

const logsStore = useLogsStore()

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getLogIcon(type) {
  switch (type) {
    case 'INFO':
      return { icon: 'mdi-information-outline', color: 'info' }
    case 'WARNING':
      return { icon: 'mdi-alert-outline', color: 'warning' }
    case 'ERROR':
      return { icon: 'mdi-alert-circle-outline', color: 'error' }
    case 'SUCCESS':
      return { icon: 'mdi-check-circle-outline', color: 'success' }
    default:
      return { icon: 'mdi-circle-outline', color: 'grey' }
  }
}

function onIntersect(isIntersecting) {
  if (isIntersecting && logsStore.hasMore && !logsStore.state.loadingMore) {
    logsStore.loadMore()
  }
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
            <p class="text-caption text-medium-emphasis">
              {{ logsStore.state.logs.length }} de {{ logsStore.totalLogs }} registros
            </p>
          </div>
        </div>
        <v-chip size="small" color="primary" variant="tonal">
          {{ logsStore.totalLogs.toLocaleString('pt-BR') }} total
        </v-chip>
      </div>
    </v-card-item>

    <v-card-text class="flex-grow-1 pt-0">
      <template v-if="logsStore.state.loading">
        <v-skeleton-loader type="table-row@5" />
      </template>

      <template v-else-if="logsStore.state.logs.length === 0">
        <div class="d-flex flex-column align-center justify-center py-12 text-center">
          <v-icon size="64" color="grey-lighten-1" class="mb-4"
            >mdi-clipboard-text-clock-outline</v-icon
          >
          <p class="text-h6 text-medium-emphasis">Nenhum log encontrado</p>
          <p class="text-body-2 text-medium-emphasis">Os registros de acesso aparecerão aqui</p>
        </div>
      </template>

      <template v-else>
        <div class="logs-scroll-container">
          <v-table fixed-header density="comfortable">
            <thead>
              <tr>
                <th class="text-left text-on-surface font-weight-bold" style="width: 40px"></th>
                <th class="text-left text-on-surface font-weight-bold">Data</th>
                <th class="text-left text-on-surface font-weight-bold">Mensagem</th>
                <th class="text-left text-on-surface font-weight-bold">Usuário</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logsStore.state.logs" :key="log.id" class="log-row">
                <td>
                  <v-icon
                    :icon="getLogIcon(log.type).icon"
                    :color="getLogIcon(log.type).color"
                    size="18"
                  />
                </td>
                <td class="text-on-surface text-no-wrap">
                  <v-icon size="14" class="mr-1" color="primary">mdi-clock-outline</v-icon>
                  {{ formatDateTime(log.date) }}
                </td>
                <td class="text-on-surface">{{ log.message }}</td>
                <td class="text-on-surface">
                  <span v-if="log.user">{{ log.user.name }}</span>
                  <span v-else class="text-medium-emphasis">—</span>
                </td>
              </tr>
            </tbody>
          </v-table>

          <!-- Sentinel para infinite scroll -->
          <div
            v-if="logsStore.hasMore"
            v-intersect="onIntersect"
            class="d-flex justify-center py-4"
          >
            <v-progress-circular
              v-if="logsStore.state.loadingMore"
              indeterminate
              color="primary"
              size="28"
              width="3"
            />
            <span v-else class="text-caption text-medium-emphasis">Carregando mais...</span>
          </div>

          <div
            v-if="!logsStore.hasMore && logsStore.state.logs.length > 0"
            class="d-flex justify-center py-3"
          >
            <v-chip size="small" variant="tonal" color="grey">
              <v-icon start size="14">mdi-check</v-icon>
              Todos os {{ logsStore.totalLogs.toLocaleString('pt-BR') }} logs carregados
            </v-chip>
          </div>
        </div>
      </template>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.logs-scroll-container {
  max-height: 420px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.logs-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.logs-scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(var(--v-theme-on-surface), 0.15);
  border-radius: 3px;
}

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
