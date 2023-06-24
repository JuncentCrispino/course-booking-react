import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react(), eslintPlugin()],
  // define: {
  //   global: {},
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
