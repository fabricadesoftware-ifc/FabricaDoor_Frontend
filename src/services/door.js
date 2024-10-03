import api from '@/plugin/axios'

class DoorService {
  async openDoor(token) {
    try {
      const response = await api.get('http://191.52.59.34:8087/api/door/open', {
        headers: {
          'Content-Type': 'application/json',
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
