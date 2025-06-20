import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useToolsStore = defineStore('tools', () => {
  // State
  const tools = ref([
    {
      id: 'ai-collab',
      name: 'ai-collab',
      icon: '🤖',
      status: 'active',
      description: 'AI Development Collaboration Assistant with cost optimization and session management.',
      language: 'Bash',
      version: 'v2.1.0',
      category: 'development',
      installed: true,
      lastUsed: new Date().toISOString()
    },
    {
      id: 'cost-optimizer',
      name: 'cost-optimizer',
      icon: '💰',
      status: 'development',
      description: 'Intelligent model selection and budget tracking for AI API usage.',
      language: 'JavaScript',
      version: 'v1.0.0',
      category: 'optimization',
      installed: false,
      lastUsed: null
    },
    {
      id: 'prompt-library',
      name: 'prompt-library',
      icon: '📝',
      status: 'planned',
      description: 'Curated collection of reusable prompt templates for common development tasks.',
      language: 'JavaScript',
      version: 'v1.0.0',
      category: 'templates',
      installed: false,
      lastUsed: null
    }
  ])

  const sessions = ref([])
  const currentSession = ref(null)
  const isLoading = ref(false)

  // Getters
  const activeSessions = computed(() => sessions.value.filter(s => s.status === 'active'))
  const installedTools = computed(() => tools.value.filter(t => t.installed))
  const availableTools = computed(() => tools.value.filter(t => !t.installed))

  const getToolById = computed(() => (id) => tools.value.find(t => t.id === id))
  const getToolsByCategory = computed(() => (category) => tools.value.filter(t => t.category === category))

  // Actions
  async function installTool(toolId) {
    isLoading.value = true
    try {
      const tool = tools.value.find(t => t.id === toolId)
      if (tool) {
        // Simulate installation
        await new Promise(resolve => setTimeout(resolve, 2000))
        tool.installed = true
        tool.status = 'active'
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  async function uninstallTool(toolId) {
    const tool = tools.value.find(t => t.id === toolId)
    if (tool) {
      tool.installed = false
      tool.status = 'available'
    }
  }

  async function startSession(toolId, config = {}) {
    const tool = tools.value.find(t => t.id === toolId)
    if (!tool || !tool.installed) {
      throw new Error('Tool not found or not installed')
    }

    const session = {
      id: `session-${Date.now()}`,
      toolId,
      toolName: tool.name,
      status: 'active',
      startTime: new Date().toISOString(),
      config,
      logs: [],
      cost: 0
    }

    sessions.value.push(session)
    currentSession.value = session
    tool.lastUsed = session.startTime

    return session
  }

  async function endSession(sessionId) {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session) {
      session.status = 'completed'
      session.endTime = new Date().toISOString()
    }
    
    if (currentSession.value?.id === sessionId) {
      currentSession.value = null
    }
  }

  function addSessionLog(sessionId, logEntry) {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session) {
      session.logs.push({
        timestamp: new Date().toISOString(),
        ...logEntry
      })
    }
  }

  async function fetchToolStatus() {
    // Simulate API call to get real-time tool status
    return tools.value.map(tool => ({
      id: tool.id,
      status: tool.status,
      lastUsed: tool.lastUsed
    }))
  }

  return {
    // State
    tools,
    sessions,
    currentSession,
    isLoading,
    
    // Getters
    activeSessions,
    installedTools,
    availableTools,
    getToolById,
    getToolsByCategory,
    
    // Actions
    installTool,
    uninstallTool,
    startSession,
    endSession,
    addSessionLog,
    fetchToolStatus
  }
})