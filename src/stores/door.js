import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { DoorService } from '@/services'
import { useAuthStore } from './auth'


export const useDoorStore = defineStore('door', () => {
  const state = reactive({
    loading: false,
    error: null
  })
  
  const store = useAuthStore()
  const token = store.authUser.token
  const openDoor = async () => {
    state.loading = true
    try {
      const response = await DoorService.openDoor(token)
      return response.data
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
