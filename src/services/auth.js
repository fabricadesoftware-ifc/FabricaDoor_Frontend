import api from '@/plugin/axios'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

class AuthService {
  async login(data) {
    try {
      const response = await api.post('auth/login/', data)
      return response.data
    } catch (error) {
      console.error(error)
      const message = error?.response?.data?.error || 'Erro ao fazer login.'
      Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#f44336'
      }).showToast()

      return error
    }
  }

  async register(data) {
    try {
      const response = await api.post('auth/register/', data)

      Toastify({
        text: 'Registro realizado com sucesso!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#4caf50'
      }).showToast()

      return response.data
    } catch (error) {
      console.error(error)
      const message = error?.response?.data?.message || 'Erro ao registrar.'
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#f44336'
      }).showToast()

      return error
    }
  }
}

export default new AuthService()
