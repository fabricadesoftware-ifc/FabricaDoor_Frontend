import { reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { LogsService } from '@/services'
import { toast } from 'vue3-toastify'

export const useLogsStore = defineStore('log', () => {
  const state = reactive({
    logs: [],
    todayCount: 0,
    loading: false,
    loadingMore: false,
    error: null,
    pagination: {
      page: 0,
      limit: 20,
      totalLogs: 0,
      totalPages: 0
    }
  })

  const hasMore = computed(() => state.pagination.page < state.pagination.totalPages)
  const totalLogs = computed(() => state.pagination.totalLogs)

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
    state.pagination.page = 1
    try {
      const response = await LogsService.getLogs({
        page: 1,
        limit: state.pagination.limit
      })
      state.logs = response.data || []
      if (response.pagination) {
        state.pagination.page = response.pagination.page
        state.pagination.totalLogs = response.pagination.totalLogs
        state.pagination.totalPages = response.pagination.totalPages
      }
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const loadMore = async () => {
    if (state.loadingMore || !hasMore.value) return
    state.loadingMore = true
    const nextPage = state.pagination.page + 1
    try {
      const response = await LogsService.getLogs({
        page: nextPage,
        limit: state.pagination.limit
      })
      const newLogs = response.data || []
      state.logs.push(...newLogs)
      if (response.pagination) {
        state.pagination.page = response.pagination.page
        state.pagination.totalLogs = response.pagination.totalLogs
        state.pagination.totalPages = response.pagination.totalPages
      }
    } catch (error) {
      state.error = error
    } finally {
      state.loadingMore = false
    }
  }

  const resetLogs = () => {
    state.logs = []
    state.pagination.page = 0
    state.pagination.totalLogs = 0
    state.pagination.totalPages = 0
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
    hasMore,
    totalLogs,
    getLogs,
    loadMore,
    resetLogs,
    getTodayCount
  }
})
