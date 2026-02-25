<script setup>
import { ref, computed } from 'vue'
import { useTagsStore } from '@/stores'
import { ModalComp, ModalTagsComp } from '..'
import { ArrowExpand } from '../icons'

const tagsStore = useTagsStore()
const tags = computed(() => tagsStore.state.tags)

const orderedTags = computed(() => {
  return tags.value.slice().sort((a, b) => {
    return a.valid === b.valid ? 0 : a.valid ? -1 : 1
  })
})

const truncateRFID = (rfid) => {
  if (!rfid) return '—'
  return rfid.length > 8 ? rfid.substring(0, 8) + '...' : rfid
}

const showModal = ref(false)
const showModalTags = ref(false)
const selected = ref({})
</script>

<template>
  <ModalComp v-model:isOpen="showModal" :objectSelected="selected" />
  <ModalTagsComp v-model:isOpen="showModalTags" />

  <v-card height="100%" class="d-flex flex-column">
    <v-card-item class="pb-0">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="d-flex align-center">
          <v-avatar color="primary" class="mr-4">
            <v-icon>mdi-tag-multiple</v-icon>
          </v-avatar>
          <div>
            <v-card-title class="text-h5 pa-0">Tags</v-card-title>
            <p class="text-caption text-medium-emphasis">Gerenciar tags RFID</p>
          </div>
        </div>
        <v-btn icon variant="tonal" color="primary" size="small" @click="showModalTags = true">
          <ArrowExpand :size="20" />
          <v-tooltip activator="parent" location="bottom">Ver todas as tags</v-tooltip>
        </v-btn>
      </div>
    </v-card-item>

    <v-card-text class="flex-grow-1 pt-0">
      <template v-if="tagsStore.isLoading">
        <v-skeleton-loader type="table-row@5" />
      </template>

      <template v-else-if="orderedTags.length === 0">
        <div class="d-flex flex-column align-center justify-center py-12 text-center">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-tag-off-outline</v-icon>
          <p class="text-h6 text-medium-emphasis">Nenhuma tag cadastrada</p>
          <p class="text-body-2 text-medium-emphasis">As tags aparecerão aqui quando forem registradas</p>
        </div>
      </template>

      <template v-else>
        <v-table fixed-header height="380px" density="comfortable">
          <thead>
            <tr>
              <th class="text-left text-on-surface font-weight-bold">ID</th>
              <th class="text-left text-on-surface font-weight-bold">RFID</th>
              <th class="text-left text-on-surface font-weight-bold">Usuário</th>
              <th class="text-center text-on-surface font-weight-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderedTags" :key="item.id"
              @click="showModal = true; selected = item" class="tag-row" style="cursor: pointer">
              <td class="text-on-surface font-weight-medium">#{{ item.id }}</td>
              <td class="text-on-surface">
                <code class="text-body-2">{{ truncateRFID(item.rfid) }}</code>
              </td>
              <td class="text-on-surface">
                <span v-if="item.user?.name">{{ item.user.name }}</span>
                <span v-else class="text-medium-emphasis font-italic">Não atribuída</span>
              </td>
              <td class="text-center">
                <v-chip :color="item.valid ? 'success' : 'error'" size="small" variant="tonal">
                  <v-icon start :icon="item.valid ? 'mdi-check-circle' : 'mdi-close-circle'" size="14" />
                  {{ item.valid ? 'Ativo' : 'Inativo' }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.tag-row {
  transition: background-color 0.2s ease;
}

.tag-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

:deep(.v-table > .v-table__wrapper > table > thead > tr > th) {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
