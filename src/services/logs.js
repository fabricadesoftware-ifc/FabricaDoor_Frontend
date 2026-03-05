import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class LogsService {
  async getLogs({ page = 1, limit = 20 } = {}) {
    try {
      const response = await api.get('logs/', {
        params: { page, limit }
      })
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async getTodayCount() {
    try {
      const response = await api.get('logs/today')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }
}

export default new LogsService()
