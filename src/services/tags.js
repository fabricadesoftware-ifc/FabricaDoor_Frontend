import api from '@/plugin/axios'

class TagsService {
  async getTags() {
    try {
      const response = await api.get('tags/')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async createTags(data) {
    try {
      const response = await api.post('tags/', data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async updateTags(data) {
    try {
      const response = await api.put(`tags/`, data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteTags(id) {
    try {
      const response = await api.delete(`tags/${id}/`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new TagsService()
