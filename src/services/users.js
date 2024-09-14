import api from '@/plugin/axios'

class UsersService {
  async getUsers() {
    try {
      const response = await api.get('users/')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async createUsers(data) {
    try {
      const response = await api.post('users/', data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async updateUsers(data) {
    try {
      const response = await api.put(`users/`, data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUsers(id) {
    try {
      const response = await api.delete(`users/${id}/`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new UsersService()
