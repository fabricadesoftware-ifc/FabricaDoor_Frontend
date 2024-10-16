import api from '@/plugin/axios'

class UsersService {
  async getUsers(token) {
    try {
      const response = await api.get('user/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async createUsers(token, data) {
    try {
      const response = await api.post(
        'user/users',
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

  async updateUsers(token, data) {
    try {
      const response = await api.put(
        `user/users`,
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

  async deleteUsers(token, id) {
    console.log(id)
    try {
      const response = await api.delete(`user/users/${id}`, {
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

export default new UsersService()
