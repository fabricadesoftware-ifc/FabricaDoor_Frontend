import api from '@/plugin/axios'
import { useAuthStore } from '@/stores'

class DoorService {
  async openDoor() {
    try {
      const response = await api.get('door/open')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async getMode() {
    try {
      const response = await api.get('door/mode')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async setMode(mode) {
    try {
      const response = await api.post('door/mode', { mode })
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async getFingerprintStatus() {
    try {
      const response = await api.get('door/fingerprints/status')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async getFingerprints() {
    try {
      const response = await api.get('door/fingerprints')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async enrollFingerprint({ slot, userId }) {
    try {
      const response = await api.post('door/fingerprints/enroll', { slot, userId })
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async cancelFingerprintEnroll() {
    try {
      const response = await api.post('door/fingerprints/cancel')
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }

  async deleteFingerprint(slot) {
    try {
      const response = await api.delete(`door/fingerprints/${slot}`)
      return response.data
    } catch (error) {
      if (error.response?.status === 403) {
        useAuthStore().logout()
      }
      throw error
    }
  }
}

export default new DoorService()
