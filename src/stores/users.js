import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { UsersService } from '@/services'
import { useAuthStore } from './auth'
import router from '@/router'

export const useUsersStore = defineStore('users', () => {
  const state = reactive({
    users: [],
    loading: false,
    error: null
  })
  const isLoading = computed(() => state.loading)
  const countUsers = computed(() => state.users.data?.users.length)

  const store = useAuthStore()
  const token = store.authUser.token
  const getUsers = async () => {
    state.loading = true
    try {
      state.users = await UsersService.getUsers(token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const createUsers = async (newUser) => {
    state.loading = true
    try {
      state.users.push(await UsersService.createUsers(token, newUser))
      router.go(0)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const updateUser = async (user) => {
    state.loading = true
    console.log(user)
    console.log(token)
    try {
      const index = state.users.data?.users.findIndex((s) => s.id === user.id)
      state.users[index] = await UsersService.updateUser(token, user)
      router.go(0)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteUser = async (id) => {
    state.loading = true
    try {
      console.log(id)
      const index = state.users.data?.users.findIndex((s) => s.id === id)
      state.users.data?.users.splice(index, 1)
      await UsersService.deleteUsers(token, id)
      router.go(0)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    countUsers,
    getUsers,
    createUsers,
    updateUser,
    deleteUser
  }
})
