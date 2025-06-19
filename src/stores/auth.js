import { defineStore } from 'pinia'
import { AuthService } from '@/services'
import { useStorage } from '@vueuse/core'
import router from '@/router'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authUser = useStorage('authUser', {
    token: null,
    isLogged: false,
    user: {
      email: '',
      id: '',
      name: '',
      isSuper: false,
      isVerified: false,
      picture: ''
    }
  })

  const isLoading = ref(false)

  const login = async (data) => {
    isLoading.value = true
    try {
      const response = await AuthService.login(data)
      console.log(response)
      if (response.data.isVerified == false) {
        logout()
      } else {
        authUser.value = {
          token: response.token,
          isLogged: true,
          user: {
            email: data.email,
            id: response.data.id,
            name: response.data.name,
            isSuper: response.data.isSuper,
            isValid: response.data.isVerified,
            picture: response.data.picture
          }
        }

        if (response.data.isSuper) {
          router.push('/dashboard')
        } else {
          router.push('/profile')
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data) => {
    try {
      const response = await AuthService.register(data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      authUser.value = {}
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    authUser,
    logout,
    login,
    register,
    isLoading
  }
})
