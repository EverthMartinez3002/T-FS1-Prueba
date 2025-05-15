import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export function setAuthToken(token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('token', token)
}

export function clearAuthToken() {
    delete apiClient.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
}

export default apiClient
