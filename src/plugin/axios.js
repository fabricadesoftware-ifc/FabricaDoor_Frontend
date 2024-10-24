import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8087/api/'
})

export default api;