import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { UsersService } from '@/services'

export const useUsersStore = defineStore('users', () => {
  const state = reactive({
    users: [],
    loading: false,
    error: null
  })
  const isLoading = computed(() => state.loading)

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
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const updateUsers = async (user) => {
    state.loading = true
    try {
      const index = state.users.results.findIndex((s) => s.id === user.id)
      state.users[index] = await UsersService.updateUsers(user)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteUsers = async (id) => {
    state.loading = true
    try {
      const index = state.users.findIndex((s) => s.id === id)
      state.users.splice(index, 1)
      const result = await UsersService.deleteUsers(id)
      console.log(result)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
  }
})
