import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

import { useLoadingStore } from '@/stores/loading'

api.interceptors.request.use((config) => {
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()
  return config
})

api.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()
    return response
  },
  (error) => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()
    return Promise.reject(error)
  }
)

export default api
