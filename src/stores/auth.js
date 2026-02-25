import { defineStore } from 'pinia'
import { AuthService } from '@/services'
import { useStorage } from '@vueuse/core'
import router from '@/router'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authUser = useStorage('authUser', {
    token: null,
    refreshToken: null,
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

  const setTokens = (token, refreshToken) => {
    authUser.value.token = token
    authUser.value.refreshToken = refreshToken
  }

  const login = async (data) => {
    isLoading.value = true
    try {
      const response = await AuthService.login(data)
      if (response.data.isVerified == false) {
        logout()
      } else {
        authUser.value = {
          token: response.token,
          refreshToken: response.refreshToken,
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
      await AuthService.register(data)
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
    setTokens,
    logout,
    login,
    register,
    isLoading
  }
})
