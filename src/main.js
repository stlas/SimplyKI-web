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
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ToolView from './views/ToolView.vue'
import AiCollabInterface from './components/tools/AiCollabInterface.vue'

// Router Configuration
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login', 
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tools/:toolName',
    name: 'Tool',
    component: ToolView,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/tools/ai-collab',
    name: 'AiCollab',
    component: AiCollabInterface,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
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