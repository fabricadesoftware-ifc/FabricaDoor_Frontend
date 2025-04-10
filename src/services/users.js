import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class UsersService {
  
  async getUsers(token) {
    const authStore = useAuthStore()
    try {
      const response = await api.get('user/users', {
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

  async createUsers(token, data) {
    const authStore = useAuthStore()
    try {
      const response = await api.post(
        'user/users',
        data, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      if (error.response.status === 403) {
        authStore.logout()
      }
      return error
    }
  }

  async updateUser(token, data) {
    const authStore = useAuthStore()
    try {
      const response = await api.put(
        `user/users/${data.id}`,
        data, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      if (error.response.status === 403) {
        authStore.logout()
      }
      return error
    }
  }

  async deleteUsers(token, id) {
    const authStore = useAuthStore()
    try {
      const response = await api.delete(`user/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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

export default new UsersService()
