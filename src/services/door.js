import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class DoorService {
  async openDoor(token) {
    const authStore = useAuthStore()
    try {
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

  async toggleMode(token){{
    const authStore = useAuthStore()
    try {
      const response = await api.get('door/mode', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response)
      return response.data
    } catch (error) {
      if (error.response.status === 403) {
        authStore.logout()
      }
      console.error(error)
      return error
    }
  }

  }


}

export default new DoorService()
