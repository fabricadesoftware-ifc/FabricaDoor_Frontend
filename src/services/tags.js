import api from '@/plugin/axios'

class TagsService {
  async getTags(token) {
    try {
      const response = await api.get('tags/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async createTags(token, data) {
    try {
      const response = await api.post(
        'tags/',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        data
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async updateTags(token, data) {
    try {
      const response = await api.put(
        `tags/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        data
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteTags(token, id) {
    try {
      const response = await api.delete(`tags/${id}/`, {
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

export default new TagsService()
