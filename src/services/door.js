import api from '@/plugin/axios'

class DoorService {
  async openDoor(token) {
    try {
      const response = await api.get('http://localhost:8087/api/door/open', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new DoorService()
