<script setup>
import { computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useAuthStore, useDoorStore, useUsersStore } from '@/stores'

const authStore = useAuthStore()
const doorStore = useDoorStore()
const usersStore = useUsersStore()

const users = computed(() => usersStore.state.users?.data?.users || [])
const fingerprints = computed(() => doorStore.state.fingerprints || [])
const status = computed(() => doorStore.state.fingerprintStatus || {})
const loading = computed(() => doorStore.state.fingerprintLoading)
const isSuperUser = computed(() => !!authStore.authUser?.user?.isSuper)
const hasUnmappedTemplates = computed(() =>
  fingerprints.value.some((fingerprint) => fingerprint.mapped === false)
)

const activeEnrollStates = ['waiting_first_finger', 'remove_finger', 'waiting_second_finger']
const isEnrolling = computed(() => activeEnrollStates.includes(status.value.enroll_state_text))

const statusColor = computed(() => {
  if (!status.value.sensor_ok) return 'error'
  if (isEnrolling.value) return 'warning'
  if (status.value.enroll_state_text === 'done') return 'success'
  if (status.value.enroll_state_text === 'failed') return 'error'
  return 'success'
})

const statusText = computed(() => {
  if (!status.value.sensor_ok) return 'Sensor indisponivel'

  const messages = {
    idle: 'Pronto',
    waiting_first_finger: 'Coloque o dedo no sensor',
    remove_finger: 'Remova o dedo',
    waiting_second_finger: 'Coloque o mesmo dedo novamente',
    done: 'Cadastro concluido',
    failed: 'Cadastro falhou'
  }

  return messages[status.value.enroll_state_text] || 'Aguardando status'
})

const userById = (id) => users.value.find((user) => user.id === id)

const refresh = async () => {
  await Promise.all([doorStore.getFingerprintStatus(), doorStore.getFingerprints()])
}

const handleDelete = async (slot) => {
  try {
    await doorStore.deleteFingerprint(slot)
    toast.success(`Digital do slot ${slot} removida`)
  } catch (error) {
    toast.error(error?.response?.data?.error || 'Erro ao remover digital')
  }
}

onMounted(() => {
  refresh().catch(() => {
    toast.error('Erro ao carregar biometria')
  })
})
</script>

<template>
  <v-card height="100%" class="d-flex flex-column">
    <v-card-item>
      <div class="d-flex align-center">
        <v-avatar color="secondary" class="mr-4">
          <v-icon>mdi-fingerprint</v-icon>
        </v-avatar>
        <div>
          <v-card-title class="text-h6 pa-0">Biometria</v-card-title>
          <v-card-subtitle class="pa-0">Digitais cadastradas no ESP32</v-card-subtitle>
        </div>
        <v-spacer />
        <v-btn icon variant="tonal" size="small" :loading="loading" @click="refresh">
          <v-icon>mdi-refresh</v-icon>
          <v-tooltip activator="parent" location="bottom">Atualizar biometria</v-tooltip>
        </v-btn>
      </div>
    </v-card-item>

    <v-card-text class="d-flex flex-column ga-4">
      <div class="d-flex align-center justify-space-between">
        <v-chip :color="statusColor" variant="tonal" label>
          <v-icon start>mdi-access-point</v-icon>
          {{ statusText }}
        </v-chip>
        <span class="text-caption text-medium-emphasis">
          {{ fingerprints.length }} digitais
        </span>
      </div>

      <v-alert
        v-if="hasUnmappedTemplates"
        type="warning"
        variant="tonal"
        density="compact"
      >
        Existem digitais gravadas no sensor sem usuario vinculado. Elas nao abrem a porta enquanto estiverem sem vinculo.
      </v-alert>

      <v-divider />

      <v-list v-if="fingerprints.length" density="compact" class="fingerprint-list">
        <v-list-item v-for="fingerprint in fingerprints" :key="fingerprint.slot">
          <template #prepend>
            <v-avatar color="primary" variant="tonal" size="36">
              <v-icon>mdi-fingerprint</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>
            Slot {{ fingerprint.slot }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ fingerprint.mapped === false ? 'Sem usuario vinculado' : userById(fingerprint.user_id)?.name || `Usuario #${fingerprint.user_id}` }}
          </v-list-item-subtitle>
          <template v-if="isSuperUser" #append>
            <v-btn
              icon
              variant="text"
              color="error"
              size="small"
              :loading="loading"
              @click="handleDelete(fingerprint.slot)"
            >
              <v-icon>mdi-delete-outline</v-icon>
              <v-tooltip activator="parent" location="bottom">Remover digital</v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-alert v-else type="info" variant="tonal" density="compact">
        Nenhuma digital cadastrada.
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.fingerprint-list {
  max-height: 280px;
  overflow-y: auto;
}
</style>
