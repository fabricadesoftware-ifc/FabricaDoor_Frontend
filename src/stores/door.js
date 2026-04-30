import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { DoorService } from '@/services'

export const useDoorStore = defineStore('door', () => {
  const state = reactive({
    loading: false,
    error: null,
    mode: false
  })

  const openDoor = async () => {
    state.loading = true
    try {
      const response = await DoorService.openDoor()
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.loading = false
    }
  }

  const getMode = async () => {
    state.loading = true
    try {
      const response = await DoorService.getMode()
      state.mode = response.data
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.loading = false
    }
  }

  const setMode = async (mode) => {
    state.loading = true
    try {
      const response = await DoorService.setMode(mode)
      state.mode = response.data?.mode ?? mode
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    openDoor,
    getMode,
    setMode
  }
})
