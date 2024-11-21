import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class LogsService {
  async getLogs(token) {
    const authStore = useAuthStore()
    try {
      const response = await api.get('logs/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      if (error.response.status === 403) {
        authStore.logout()
      }
      return error
    }
  }
}

export default new LogsService()
