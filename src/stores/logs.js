import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { LogsService } from '@/services'
import { useAuthStore } from './auth'
import { toast } from 'vue3-toastify'

export const useLogsStore = defineStore('log', () => {
  const state = reactive({
    logs: [],
    loading: false,
    error: null
  })

  const store = useAuthStore()
  const token = store.authUser.token

    watch(
      () => state.error,
      (value) => {
        if (value) {
          toast.error(value) // Exibe a mensagem de erro no toast
        }
      }
    )

  const getLogs = async () => {
    state.loading = true
    try {
      const response = await LogsService.getLogs(token)
        state.logs = response.data || []
        state.logs.reverse()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    getLogs,
  }
})
