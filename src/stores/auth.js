import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userDisplayName = computed(() => user.value?.name || user.value?.email || 'User')

  // Actions
  async function login(credentials) {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      const response = await simulateApiCall('/api/auth/login', credentials)
      
      token.value = response.token
      user.value = response.user
      localStorage.setItem('token', response.token)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      const response = await simulateApiCall('/api/auth/register', userData)
      
      token.value = response.token
      user.value = response.user
      localStorage.setItem('token', response.token)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  async function fetchUser() {
    if (!token.value) return
    
    try {
      // TODO: Replace with actual API call
      const response = await simulateApiCall('/api/auth/me')
      user.value = response.user
    } catch (error) {
      console.error('Failed to fetch user:', error)
      logout()
    }
  }

  // Initialize
  if (token.value) {
    fetchUser()
  }

  return {
    // State
    user,
    token,
    isLoading,
    
    // Getters
    isAuthenticated,
    userDisplayName,
    
    // Actions
    login,
    register,
    logout,
    fetchUser
  }
})

// Simulate API calls for development
async function simulateApiCall(endpoint, data = null) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (endpoint === '/api/auth/login') {
    if (data.email === 'demo@simplyki.net' && data.password === 'demo') {
      return {
        token: 'demo-token-' + Date.now(),
        user: { id: 1, name: 'Demo User', email: 'demo@simplyki.net' }
      }
    }
    throw new Error('Invalid credentials')
  }
  
  if (endpoint === '/api/auth/register') {
    return {
      token: 'demo-token-' + Date.now(),
      user: { id: 2, name: data.name, email: data.email }
    }
  }
  
  if (endpoint === '/api/auth/me') {
    return {
      user: { id: 1, name: 'Demo User', email: 'demo@simplyki.net' }
    }
  }
  
  throw new Error('API endpoint not found')
}