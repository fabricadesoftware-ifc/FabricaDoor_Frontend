import api from '@/plugin/axios'

class DoorService {
  async openDoor(token) {
    try {
      console.log("opa")
      const response = await api.get('door/open', {
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
