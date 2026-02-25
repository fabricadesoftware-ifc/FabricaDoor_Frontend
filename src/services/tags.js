import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class TagsService {
  async getTags() {
    try {
      const response = await api.get('tags/')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async updateTags(id, data) {
    try {
      const response = await api.put(`tags/${id}/`, data)
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async deleteTags(id) {
    try {
      const response = await api.delete(`tags/${id}/`)
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async verifyTag(id) {
    try {
      const response = await api.put(`tags/update/${Number(id)}/`, {})
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async assignTag(data) {
    try {
      const response = await api.post('tags/assign/', data)
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }

  async unassignTag(id) {
    try {
      const response = await api.post(`tags/unassign/${id}/`, {})
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      return error
    }
  }
}

export default new TagsService()
