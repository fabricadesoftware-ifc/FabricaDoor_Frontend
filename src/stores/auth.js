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
      user: ''
    }
  })

  const isLoading = ref(false)

  const login = async (data) => {
    isLoading.value = true
    try {
      console.log('login')
      const response = await AuthService.login(data)

      authUser.value = {
        token: response.token,
        isLogged: true,
        user: {
          user: data.email
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
      router.push('/dashboard')
      console.log(authUser.value)
    }
  }

  const logout = async () => {
    try {
      authUser.value = {
        token: null,
        isLogged: false,
        user: {
          user: ''
        }
      }
      router.push('/login')
    } catch (error) {
      console.error(error)
    } finally {
      console.log(authUser.value)
    }
  }

  return {
    authUser,
    logout,
    login,
    isLoading
  }
})
