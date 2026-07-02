<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAuthStore, useDoorStore, useUsersStore } from '@/stores'

const authStore = useAuthStore()
const doorStore = useDoorStore()
const usersStore = useUsersStore()
const polling = ref(null)

const form = reactive({
  userId: null
})

const users = computed(() => usersStore.state.users?.data?.users || [])
const fingerprints = computed(() => doorStore.state.fingerprints || [])
const status = computed(() => doorStore.state.fingerprintStatus || {})
const loading = computed(() => doorStore.state.fingerprintLoading)
const isSuperUser = computed(() => !!authStore.authUser?.user?.isSuper)
const sensorTemplateCount = computed(() => Number(status.value.templates_sensor || 0))
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

const filterUsers = (_value, query, item) => {
  const user = item?.raw || {}
  const searchText = [user.name, user.email, user.id].filter(Boolean).join(' ').toLowerCase()
  return searchText.includes(query.toLowerCase())
}

const refresh = async () => {
  await Promise.all([doorStore.getFingerprintStatus(), doorStore.getFingerprints()])
  if (isEnrolling.value) {
    startPolling()
  }
}

const stopPolling = () => {
  if (polling.value) {
    clearInterval(polling.value)
    polling.value = null
  }
}

const startPolling = () => {
  stopPolling()
  polling.value = setInterval(async () => {
    try {
      await doorStore.getFingerprintStatus()
      if (!isEnrolling.value) {
        stopPolling()
        await doorStore.getFingerprints()
      }
    } catch {
      stopPolling()
    }
  }, 2000)
}

const handleEnroll = async () => {
  try {
    await doorStore.enrollFingerprint({
      userId: Number(form.userId)
    })
    toast.success('Cadastro biometrico iniciado')
    startPolling()
  } catch (error) {
    toast.error(error?.response?.data?.error || 'Erro ao iniciar cadastro biometrico')
  }
}

const handleCancel = async () => {
  try {
    await doorStore.cancelFingerprintEnroll()
    stopPolling()
    toast.success('Cadastro cancelado')
  } catch (error) {
    toast.error(error?.response?.data?.error || 'Erro ao cancelar cadastro')
  }
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

onBeforeUnmount(stopPolling)
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

      <v-row v-if="isSuperUser" dense>
        <v-col cols="12">
          <v-autocomplete
            v-model="form.userId"
            :items="users"
            :custom-filter="filterUsers"
            item-title="name"
            item-value="id"
            label="Usuario"
            prepend-inner-icon="mdi-account-search"
            variant="outlined"
            density="compact"
            clearable
            hide-details
            no-data-text="Nenhum usuario encontrado"
          >
            <template #item="{ props: itemProps, item }">
              <v-list-item v-bind="itemProps">
                <v-list-item-subtitle>{{ item.raw.email }}</v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <div v-if="isSuperUser" class="d-flex flex-wrap ga-2">
        <v-btn
          color="primary"
          prepend-icon="mdi-fingerprint"
          :loading="loading && !isEnrolling"
          :disabled="!form.userId || isEnrolling"
          @click="handleEnroll"
        >
          Cadastrar
        </v-btn>
        <v-btn
          color="warning"
          variant="tonal"
          prepend-icon="mdi-cancel"
          :disabled="!isEnrolling"
          @click="handleCancel"
        >
          Cancelar
        </v-btn>
      </div>

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
