import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class DoorService {
  async openDoor(token) {
    const authStore = useAuthStore()
    try {
      console.log("opa")
      const response = await api.get('door/open', {
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

export default new DoorService()
