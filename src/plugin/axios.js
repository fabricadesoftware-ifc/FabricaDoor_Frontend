import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'

let isRefreshing = false
let failedQueue = []
const refreshUrl = new URL('auth/refresh', import.meta.env.VITE_BACKEND_URL).toString()

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.request.use((config) => {
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()

  const authStore = useAuthStore()
  const token = authStore.authUser?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()
    return response
  },
  async (error) => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()

    const originalRequest = error.config
    const authStore = useAuthStore()
    const refreshToken = authStore.authUser?.refreshToken
    const status = error.response?.status
    const errorCode = error.response?.data?.code
    const requestUrl = originalRequest?.url || ''
    const isRefreshRequest = requestUrl.includes('auth/refresh')
    const shouldRefresh =
      status === 401 &&
      !isRefreshRequest &&
      !originalRequest?._retry &&
      !!refreshToken &&
      (!errorCode || errorCode === 'TOKEN_EXPIRED')

    if (shouldRefresh) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post(refreshUrl, { refreshToken })
        const nextToken = data?.token
        const nextRefreshToken = data?.refreshToken

        if (!nextToken || !nextRefreshToken) {
          throw new Error('Refresh response missing token data')
        }

        authStore.setTokens(nextToken, nextRefreshToken)
        processQueue(null, nextToken)

        originalRequest.headers.Authorization = `Bearer ${nextToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        authStore.logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
