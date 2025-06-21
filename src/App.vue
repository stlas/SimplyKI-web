<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
    <!-- Navigation Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo & Brand -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-3">
              <div class="text-2xl">🚀</div>
              <span class="text-xl font-bold text-gray-900">SimplyKI</span>
              <span class="text-sm text-gray-500 hidden sm:block">Meta-Framework</span>
            </router-link>
          </div>
          
          <!-- Navigation Links -->
          <div class="flex items-center space-x-4">
            <!-- Language Switcher -->
            <LanguageSwitcher />
            <template v-if="!authStore.isAuthenticated">
              <router-link 
                to="/login" 
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </router-link>
              <router-link 
                to="/register" 
                class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </router-link>
            </template>
            
            <template v-else>
              <router-link 
                to="/dashboard" 
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </router-link>
              
              <!-- User Menu -->
              <div class="relative" ref="userMenu">
                <button 
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">
                      {{ authStore.user?.username?.[0]?.toUpperCase() }}
                    </span>
                  </div>
                  <span>{{ authStore.user?.username }}</span>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  v-show="showUserMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <button 
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            © 2025 SimplyKI. Built with ❤️ for the AI development community.
          </div>
          <div class="flex space-x-6">
            <a 
              href="https://github.com/stlas/SimplyKI" 
              target="_blank"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Documentation</span>
              📚
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Loading Overlay -->
    <div 
      v-if="isLoading" 
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
        <span class="text-gray-900">Loading...</span>
      </div>
    </div>

    <!-- Notification Toast -->
    <div 
      v-if="notification"
      class="fixed top-4 right-4 z-50 transform transition-all duration-300"
      :class="notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'"
    >
      <div class="rounded-lg p-4 text-white shadow-lg max-w-sm">
        <div class="flex items-center">
          <span class="text-lg mr-2">
            {{ notification.type === 'error' ? '❌' : '✅' }}
          </span>
          <span>{{ notification.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useConfigStore } from './stores/config'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

export default {
  name: 'App',
  components: {
    LanguageSwitcher
  },
  setup() {
    const authStore = useAuthStore()
    const configStore = useConfigStore()
    
    const showUserMenu = ref(false)
    const isLoading = ref(false)
    const notification = ref(null)
    const userMenu = ref(null)

    // Close user menu when clicking outside
    const handleClickOutside = (event) => {
      if (userMenu.value && !userMenu.value.contains(event.target)) {
        showUserMenu.value = false
      }
    }

    const logout = async () => {
      try {
        await authStore.logout()
        notification.value = {
          type: 'success',
          message: 'Successfully logged out'
        }
        setTimeout(() => notification.value = null, 3000)
      } catch (error) {
        notification.value = {
          type: 'error',
          message: 'Logout failed'
        }
        setTimeout(() => notification.value = null, 3000)
      }
    }

    onMounted(async () => {
      document.addEventListener('click', handleClickOutside)
      
      // Initialize app
      isLoading.value = true
      try {
        await configStore.loadConfig()
        if (authStore.token) {
          await authStore.getCurrentUser()
        }
      } catch (error) {
        console.error('App initialization failed:', error)
      } finally {
        isLoading.value = false
      }
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      authStore,
      configStore,
      showUserMenu,
      isLoading,
      notification,
      userMenu,
      logout
    }
  }
}
</script>

<style>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>