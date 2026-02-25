import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class LogsService {
  async getLogs() {
    try {
      const response = await api.get('logs/')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
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
      return error
    }
  }
}

export default new LogsService()
