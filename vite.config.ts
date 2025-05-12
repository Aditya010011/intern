import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd());
  
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api/chat': {
          target: 'https://integrate.api.nvidia.com/v1/chat/completions',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/chat/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_NVIDIA_API_KEY || ''}`,
          },
        },
      },
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
