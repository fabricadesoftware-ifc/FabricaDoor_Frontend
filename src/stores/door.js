import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { DoorService } from '@/services'
import { useAuthStore } from './auth'

const store = useAuthStore()
const token = store.authUser.token

export const useDoorStore = defineStore('door', () => {
  const state = reactive({
    open: false,
    loading: false,
    error: null
  })

  const openDoor = async () => {
    state.loading = true
    try {
      const response = await DoorService.openDoor(token)
      state.open = response.data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    openDoor
  }
})
