// SimplyKI Web Application Entry Point
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

// Import Stores
import { useAuthStore } from './stores/auth'
import { useToolsStore } from './stores/tools'
import { useConfigStore } from './stores/config'

// Import Views
import Home from './views/Home.vue'

// Router Configuration
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  next() // Simplified for now
})

// Pinia Store
const pinia = createPinia()

// Create App
const app = createApp(App)

app.use(pinia)
app.use(router)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // In production: send to error tracking service
}

// Mount app
app.mount('#app')

// Development helpers
if (import.meta.env.DEV) {
  window.app = app
  window.router = router
  console.log('🚀 SimplyKI Development Mode Active')
}