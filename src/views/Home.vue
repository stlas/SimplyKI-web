<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex items-center">
      <!-- Animated background blocks -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-blocks">
          <div v-for="i in 12" :key="i" 
               class="floating-block absolute opacity-10"
               :style="getBlockStyle(i)">
          </div>
        </div>
      </div>
      
      <div class="container mx-auto px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Logo -->
          <div class="mb-8 flex justify-center">
            <img src="../assets/simplyKI_web_logo.svg" alt="SimplyKI" class="h-20 w-auto">
          </div>
          
          <!-- Main Headline -->
          <h1 class="text-hero text-gradient mb-6">
            AI Development Meta-Framework
          </h1>
          
          <!-- Subtext -->
          <p class="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Unified platform for <strong class="text-brand">cost-optimized</strong> AI-powered software development. 
            Simple tools, powerful results.
          </p>
          
          <!-- Feature Pills -->
          <div class="flex flex-wrap justify-center gap-3 mb-10">
            <span class="feature-pill">🌐 Web Platform</span>
            <span class="feature-pill">💰 Cost Optimization</span>
            <span class="feature-pill">🔧 Plugin System</span>
            <span class="feature-pill">🚀 Easy Integration</span>
          </div>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button @click="scrollToQuickStart" class="btn-primary text-lg px-8 py-4">
              🚀 Get Started
            </button>
            <a href="https://github.com/stlas/SimplyKI" target="_blank" 
               class="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
          
          <!-- Status Badge -->
          <div class="mt-8">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
              <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              Live Platform Available on simplyki.net
            </span>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-surface">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-title text-primary mb-4">Why SimplyKI?</h2>
          <p class="text-subtitle text-secondary max-w-2xl mx-auto">
            Built for developers who want powerful AI tools without complexity or cost explosions.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" 
               class="card text-center group">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-semibold text-primary mb-3">{{ feature.title }}</h3>
            <p class="text-secondary leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture Section -->
    <section class="py-20 bg-background-alt">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-title text-primary mb-4">Architecture Overview</h2>
          <p class="text-subtitle text-secondary max-w-2xl mx-auto">
            Three-layer architecture for maximum flexibility and scalability.
          </p>
        </div>
        
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-3 gap-8">
            <div v-for="layer in architectureLayers" :key="layer.title"
                 class="card text-center relative">
              <div class="text-3xl mb-4">{{ layer.icon }}</div>
              <h3 class="text-xl font-semibold text-primary mb-3">{{ layer.title }}</h3>
              <p class="text-secondary mb-4">{{ layer.description }}</p>
              <ul class="text-sm text-muted space-y-1">
                <li v-for="feature in layer.features" :key="feature">
                  • {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tool Ecosystem Section -->
    <section class="py-20 bg-surface">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-title text-primary mb-4">Tool Ecosystem</h2>
          <p class="text-subtitle text-secondary max-w-2xl mx-auto">
            Integrated AI development tools, each optimized for specific tasks.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="tool in tools" :key="tool.name"
               class="card relative">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="text-2xl">{{ tool.icon }}</div>
                <h3 class="text-lg font-semibold text-primary">{{ tool.name }}</h3>
              </div>
              <span :class="getStatusClass(tool.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                {{ tool.status }}
              </span>
            </div>
            <p class="text-secondary text-sm mb-4">{{ tool.description }}</p>
            <div class="flex items-center gap-2 text-xs text-muted">
              <span>{{ tool.language }}</span>
              <span>•</span>
              <span>{{ tool.version }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section id="quick-start" class="py-20 bg-background-alt">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-title text-primary mb-4">Quick Start</h2>
          <p class="text-subtitle text-secondary max-w-2xl mx-auto">
            Get SimplyKI running in minutes with our simple setup process.
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="card bg-background-dark text-inverse p-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-medium text-success">Terminal</h3>
              <button @click="copyCode" class="btn-secondary text-sm">
                {{ copied ? '✅ Copied!' : '📋 Copy' }}
              </button>
            </div>
            <pre class="text-sm overflow-x-auto"><code class="text-success font-mono">{{ quickStartCode }}</code></pre>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6 mt-8">
            <div class="text-center">
              <div class="text-3xl mb-3">⚡</div>
              <h4 class="font-semibold text-primary mb-2">Instant Setup</h4>
              <p class="text-sm text-secondary">One command installation</p>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-3">🔧</div>
              <h4 class="font-semibold text-primary mb-2">Auto Configuration</h4>
              <p class="text-sm text-secondary">Zero-config plugin system</p>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-3">🚀</div>
              <h4 class="font-semibold text-primary mb-2">Ready to Use</h4>
              <p class="text-sm text-secondary">Start building immediately</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary text-inverse">
      <div class="container mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-title mb-4">Ready to Build with AI?</h2>
        <p class="text-subtitle mb-8 max-w-2xl mx-auto opacity-90">
          Join developers who are already building smarter with SimplyKI's cost-optimized AI tools.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/register" class="btn-secondary bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
            Start Building Free
          </router-link>
          <a href="https://github.com/stlas/SimplyKI/docs" target="_blank" 
             class="btn-secondary border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
            Read Documentation
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  setup() {
    const copied = ref(false)
    
    const features = [
      {
        icon: '🌐',
        title: 'Unified Platform',
        description: 'Single web interface for all your AI development tools. No more context switching between different applications.'
      },
      {
        icon: '💰',
        title: 'Cost Optimization',
        description: 'Intelligent model selection and template reuse can reduce AI development costs by up to 70%.'
      },
      {
        icon: '🔧',
        title: 'Plugin System',
        description: 'Modular architecture allows easy integration of new AI tools. Build once, integrate everywhere.'
      },
      {
        icon: '🚀',
        title: 'Easy Integration',
        description: 'Git submodules and standardized APIs make it simple to add SimplyKI to existing projects.'
      },
      {
        icon: '📊',
        title: 'Monitoring & Analytics',
        description: 'Real-time tracking of costs, performance, and usage across all your AI development activities.'
      },
      {
        icon: '🛡️',
        title: 'Production Ready',
        description: 'Built with enterprise-grade security, scalability, and reliability from day one.'
      }
    ]
    
    const architectureLayers = [
      {
        icon: '🌐',
        title: 'Web Frontend',
        description: 'Browser-based interface built with Vue.js for modern, responsive user experience.',
        features: ['Vue.js 3 SPA', 'Real-time Dashboard', 'Mobile Responsive', 'Progressive Web App']
      },
      {
        icon: '🔧',
        title: 'Tool Ecosystem',
        description: 'Collection of specialized AI development tools, each optimized for specific tasks.',
        features: ['ai-collab', 'cost-optimizer', 'prompt-library', 'Plugin Framework']
      },
      {
        icon: '🏛️',
        title: 'Core Infrastructure',
        description: 'Shared foundation providing authentication, configuration, and plugin management.',
        features: ['User Management', 'Plugin System', 'Configuration', 'API Gateway']
      }
    ]
    
    const tools = [
      {
        name: 'ai-collab',
        icon: '🤖',
        status: '✅ Active',
        description: 'AI Development Collaboration Assistant with cost optimization and session management.',
        language: 'Bash',
        version: 'v2.1.0'
      },
      {
        name: 'cost-optimizer',
        icon: '💰',
        status: '🔄 Development',
        description: 'Intelligent model selection and budget tracking for AI API usage.',
        language: 'JavaScript',
        version: 'v1.0.0'
      },
      {
        name: 'prompt-library',
        icon: '📝',
        status: '📋 Planned',
        description: 'Curated collection of reusable prompt templates for common development tasks.',
        language: 'JavaScript',
        version: 'v1.0.0'
      }
    ]
    
    const quickStartCode = `# Clone SimplyKI
git clone https://github.com/stlas/SimplyKI.git
cd SimplyKI

# Initialize core system
./core/setup.sh

# Start web interface
cd web && npm install && npm run dev

# Open: http://localhost:3000`

    const getBlockStyle = (index) => {
      const positions = [
        { top: '10%', left: '10%' }, { top: '20%', left: '80%' }, { top: '30%', left: '60%' },
        { top: '40%', left: '20%' }, { top: '50%', left: '90%' }, { top: '60%', left: '40%' },
        { top: '70%', left: '70%' }, { top: '80%', left: '30%' }, { top: '90%', left: '50%' },
        { top: '15%', left: '50%' }, { top: '45%', left: '75%' }, { top: '75%', left: '15%' }
      ]
      
      const colors = ['var(--primary-blue)', 'var(--primary-purple)', 'var(--accent-pink)', 'var(--accent-coral)']
      const size = Math.random() * 20 + 15
      
      return {
        top: positions[index - 1]?.top || '50%',
        left: positions[index - 1]?.left || '50%',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colors[(index - 1) % colors.length],
        borderRadius: '4px',
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }
    }
    
    const getStatusClass = (status) => {
      if (status.includes('Active')) return 'status-online'
      if (status.includes('Development')) return 'status-warning'
      return 'status-error'
    }
    
    const scrollToQuickStart = () => {
      document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' })
    }
    
    const copyCode = async () => {
      try {
        await navigator.clipboard.writeText(quickStartCode)
        copied.value = true
        setTimeout(() => copied.value = false, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
    
    // Add floating animation keyframes
    onMounted(() => {
      const style = document.createElement('style')
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        .floating-block {
          transition: all 0.3s ease;
        }
        
        .floating-block:hover {
          transform: scale(1.2) !important;
          opacity: 0.3 !important;
        }
      `
      document.head.appendChild(style)
    })
    
    return {
      features,
      architectureLayers,
      tools,
      quickStartCode,
      copied,
      getBlockStyle,
      getStatusClass,
      scrollToQuickStart,
      copyCode
    }
  }
}
</script>

<style scoped>
.feature-pill {
  @apply inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 border border-gray-200;
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
  background: var(--gradient-primary);
}

.floating-blocks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.code-block {
  background: var(--background-dark);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-block {
    display: none;
  }
  
  .hero-section {
    min-height: 80vh;
  }
}
</style>