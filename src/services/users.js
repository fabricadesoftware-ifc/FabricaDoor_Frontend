import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class UsersService {
  async getUsers() {
    try {
      const response = await api.get('user/users')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async createUsers(data) {
    try {
      const response = await api.post('user/users', data)
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async updateUser(data) {
    try {
      const response = await api.put(`user/users/${data.id}`, data)
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async deleteUsers(id) {
    try {
      const response = await api.delete(`user/users/${id}`)
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }
}

export default new UsersService()
