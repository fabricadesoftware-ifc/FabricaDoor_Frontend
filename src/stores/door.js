import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { DoorService } from '@/services'

export const useDoorStore = defineStore('door', () => {
  const state = reactive({
    loading: false,
    error: null
  })

  const openDoor = async () => {
    state.loading = true
    try {
      const response = await DoorService.openDoor()
      return response.data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const toggleMode = async () => {
    state.loading = true
    try {
      const response = await DoorService.toggleMode()
      return response.data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    openDoor,
    toggleMode
  }
})
