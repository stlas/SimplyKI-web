<template>
  <div class="relative">
    <!-- Language Switch Button -->
    <button 
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      :title="$t('language.switch')"
    >
      <span class="text-lg">{{ currentFlag }}</span>
      <span class="text-sm font-medium text-gray-700">{{ currentName }}</span>
      <svg 
        class="w-4 h-4 text-gray-500 transition-transform" 
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div 
      v-show="isOpen"
      class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      @click="closeDropdown"
    >
      <div class="py-1">
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600': locale.code === currentLocale }"
        >
          <span class="text-lg">{{ locale.flag }}</span>
          <span class="font-medium">{{ locale.name }}</span>
          <span v-if="locale.code === currentLocale" class="ml-auto text-blue-600">
            ✓
          </span>
        </button>
      </div>
    </div>

    <!-- Backdrop to close dropdown -->
    <div 
      v-if="isOpen"
      @click="closeDropdown" 
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, getCurrentLocale, availableLocales } from '../i18n.js'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { locale } = useI18n()
    const isOpen = ref(false)

    const currentLocale = computed(() => getCurrentLocale())
    
    const currentLanguage = computed(() => 
      availableLocales.find(lang => lang.code === currentLocale.value)
    )
    
    const currentFlag = computed(() => currentLanguage.value?.flag || '🌐')
    const currentName = computed(() => currentLanguage.value?.name || 'Language')

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const closeDropdown = () => {
      isOpen.value = false
    }

    const switchLanguage = (localeCode) => {
      if (setLocale(localeCode)) {
        closeDropdown()
        
        // Smooth page reload to apply new language
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
    }

    // Close dropdown on escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDropdown()
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleEscape)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape)
    })

    return {
      isOpen,
      currentLocale,
      currentFlag, 
      currentName,
      availableLocales,
      toggleDropdown,
      closeDropdown,
      switchLanguage
    }
  }
}
</script>

<style scoped>
/* Smooth transitions */
.transition-transform {
  transition: transform 0.2s ease;
}

.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>