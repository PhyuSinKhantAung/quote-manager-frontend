import axios from 'axios'

// Base URL for API
const API_BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL
})

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

export default api
