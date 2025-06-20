import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // State
  const config = ref({
    app: {
      name: 'SimplyKI',
      version: '1.0.0',
      environment: 'production',
      apiBaseUrl: 'https://simplyki.net/api'
    },
    user: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
      notifications: true
    },
    ai: {
      defaultModel: 'claude-3.5-sonnet',
      costLimit: 100,
      currency: 'USD',
      optimizeForCost: true
    },
    tools: {
      autoUpdate: true,
      enableBeta: false,
      maxSessions: 5,
      sessionTimeout: 3600000 // 1 hour
    },
    development: {
      enableDebug: false,
      logLevel: 'info',
      enableTelemetry: true
    }
  })

  const isLoading = ref(false)
  const lastSaved = ref(null)

  // Getters
  const isDarkMode = computed(() => config.value.user.theme === 'dark')
  const apiUrl = computed(() => config.value.app.apiBaseUrl)
  const currentCostLimit = computed(() => config.value.ai.costLimit)

  // Actions
  async function loadConfig() {
    isLoading.value = true
    try {
      // Try to load from localStorage first
      const savedConfig = localStorage.getItem('simplyki-config')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        config.value = { ...config.value, ...parsed }
      }

      // TODO: Also fetch from API for server-side settings
      // const serverConfig = await fetchServerConfig()
      // config.value = { ...config.value, ...serverConfig }
      
    } catch (error) {
      console.error('Failed to load config:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function saveConfig() {
    try {
      // Save to localStorage
      localStorage.setItem('simplyki-config', JSON.stringify(config.value))
      lastSaved.value = new Date().toISOString()

      // TODO: Also save to API for server-side persistence
      // await saveServerConfig(config.value)
      
      return { success: true }
    } catch (error) {
      console.error('Failed to save config:', error)
      return { success: false, error: error.message }
    }
  }

  function updateConfig(path, value) {
    const keys = path.split('.')
    let target = config.value
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {}
      }
      target = target[keys[i]]
    }
    
    target[keys[keys.length - 1]] = value
    saveConfig() // Auto-save
  }

  function resetConfig() {
    config.value = {
      app: {
        name: 'SimplyKI',
        version: '1.0.0',
        environment: 'production',
        apiBaseUrl: 'https://simplyki.net/api'
      },
      user: {
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        notifications: true
      },
      ai: {
        defaultModel: 'claude-3.5-sonnet',
        costLimit: 100,
        currency: 'USD',
        optimizeForCost: true
      },
      tools: {
        autoUpdate: true,
        enableBeta: false,
        maxSessions: 5,
        sessionTimeout: 3600000
      },
      development: {
        enableDebug: false,
        logLevel: 'info',
        enableTelemetry: true
      }
    }
    saveConfig()
  }

  function toggleTheme() {
    config.value.user.theme = config.value.user.theme === 'light' ? 'dark' : 'light'
    saveConfig()
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  // Initialize
  loadConfig()

  // Apply theme on load
  document.documentElement.classList.toggle('dark', isDarkMode.value)

  return {
    // State
    config,
    isLoading,
    lastSaved,
    
    // Getters
    isDarkMode,
    apiUrl,
    currentCostLimit,
    
    // Actions
    loadConfig,
    saveConfig,
    updateConfig,
    resetConfig,
    toggleTheme
  }
})