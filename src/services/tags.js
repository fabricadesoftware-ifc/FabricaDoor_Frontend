import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class TagsService {
  async getTags(token) {
    const authStore = useAuthStore()
    try {
      const response = await api.get('tags/', {
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

  async updateTags(token, id, data) {
    const authStore = useAuthStore()
    try {
      const response = await api.put(`tags/${id}/`, data, {
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

  async deleteTags(token, id) {
    const authStore = useAuthStore()
    try {
      const response = await api.delete(`tags/${id}/`, {
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

  async verifyTag(token, id) {
    const authStore = useAuthStore()
    try {
      const response = await api.put(
        `tags/update/${Number(id)}/`,
        {},
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

  async assignTag(token, data) {
    const authStore = useAuthStore()
    try {
      const response = await api.post('tags/assign/', data, {
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

export default new TagsService()
