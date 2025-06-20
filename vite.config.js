import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // Build optimization
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-ui': ['lucide-vue'],
          
          // App chunks
          'app-stores': ['./src/stores/auth.js', './src/stores/tools.js', './src/stores/config.js'],
          'app-components': ['./src/components/common', './src/components/ui']
        },
        
        // Asset naming
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `img/[name]-[hash].${extType}`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash].${extType}`
          }
          return `assets/[name]-[hash].${extType}`
        }
      }
    },
    
    // Bundle size warnings
    chunkSizeWarningLimit: 1000,
    
    // CSS handling
    cssCodeSplit: true,
    
    // Optimize assets
    assetsInlineLimit: 4096
  },
  
  // CSS preprocessing
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@styles/colors.css";`
      }
    }
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['@vueuse/core']
  },
  
  // Environment variables
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  },
  
  // Preview server (for production testing)
  preview: {
    port: 3001,
    host: true,
    strictPort: true
  }
})