import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class DoorService {
  async openDoor() {
    try {
      const response = await api.get('door/open')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async toggleMode() {
    try {
      const response = await api.get('door/mode')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }
}

export default new DoorService()
