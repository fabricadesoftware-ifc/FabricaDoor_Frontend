import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { LogsService } from '@/services'
import { toast } from 'vue3-toastify'

export const useLogsStore = defineStore('log', () => {
  const state = reactive({
    logs: [],
    todayCount: 0,
    loading: false,
    error: null
  })

  watch(
    () => state.error,
    (value) => {
      if (value) {
        toast.error(value)
      }
    }
  )

  const getLogs = async () => {
    state.loading = true
    try {
      const response = await LogsService.getLogs()
      state.logs = response.data || []
      state.logs.reverse()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getTodayCount = async () => {
    try {
      const response = await LogsService.getTodayCount()
      state.todayCount = response.data?.count ?? 0
    } catch (error) {
      state.error = error
    }
  }

  return {
    state,
    getLogs,
    getTodayCount,
  }
})
