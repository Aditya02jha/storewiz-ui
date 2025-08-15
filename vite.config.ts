// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// // import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 5140,
//   },
//   plugins: [
//     react(),
//   ].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})