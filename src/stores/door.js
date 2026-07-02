import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { DoorService } from '@/services'

export const useDoorStore = defineStore('door', () => {
  const state = reactive({
    loading: false,
    error: null,
    mode: false,
    fingerprintStatus: null,
    fingerprints: [],
    fingerprintLoading: false
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

  const getFingerprintStatus = async () => {
    state.fingerprintLoading = true
    try {
      const response = await DoorService.getFingerprintStatus()
      state.fingerprintStatus = response.data
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.fingerprintLoading = false
    }
  }

  const getFingerprints = async () => {
    state.fingerprintLoading = true
    try {
      const response = await DoorService.getFingerprints()
      state.fingerprints = response.data?.fingerprints || []
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.fingerprintLoading = false
    }
  }

  const enrollFingerprint = async ({ userId }) => {
    state.fingerprintLoading = true
    try {
      const response = await DoorService.enrollFingerprint({ userId })
      state.fingerprintStatus = response.data
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.fingerprintLoading = false
    }
  }

  const cancelFingerprintEnroll = async () => {
    state.fingerprintLoading = true
    try {
      const response = await DoorService.cancelFingerprintEnroll()
      state.fingerprintStatus = response.data
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.fingerprintLoading = false
    }
  }

  const deleteFingerprint = async (slot) => {
    state.fingerprintLoading = true
    try {
      const response = await DoorService.deleteFingerprint(slot)
      state.fingerprints = state.fingerprints.filter((fingerprint) => fingerprint.slot !== slot)
      await getFingerprints()
      return response.data
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.fingerprintLoading = false
    }
  }

  return {
    state,
    openDoor,
    getMode,
    setMode,
    getFingerprintStatus,
    getFingerprints,
    enrollFingerprint,
    cancelFingerprintEnroll,
    deleteFingerprint
  }
})
