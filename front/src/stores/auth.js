import { defineStore } from 'pinia'
import apiClient from '../services/network.services'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('token')
      delete apiClient.defaults.headers.common['Authorization']
    }
  },
})
