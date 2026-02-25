import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { UsersService } from '@/services'
import router from '@/router'

export const useUsersStore = defineStore('users', () => {
  const state = reactive({
    users: [],
    loading: false,
    error: null
  })
  const isLoading = computed(() => state.loading)
  const countUsers = computed(() => state.users.data?.users.length)

  const getUsers = async () => {
    state.loading = true
    try {
      state.users = await UsersService.getUsers()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const createUsers = async (newUser) => {
    state.loading = true
    try {
      state.users.push(await UsersService.createUsers(newUser))
      router.go(0)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const updateUser = async (user) => {
    state.loading = true
    try {
      const index = state.users.data?.users.findIndex((s) => s.id === user.id)
      state.users[index] = await UsersService.updateUser(user)
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
      const index = state.users.data?.users.findIndex((s) => s.id === id)
      state.users.data?.users.splice(index, 1)
      await UsersService.deleteUsers(id)
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
