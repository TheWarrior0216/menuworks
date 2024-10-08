import { fileURLToPath, URL } from "node:url";
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: 'docs',
    sourcemap: false
  },
  server: {
    port: 8080
  },
  optimizeDeps: {
    include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
  },
  // NOTE If deploying to gh-pages uncomment the line below (https://vitejs.dev/config/shared-options.html#base)
  // base: '/menuworks/'
})
