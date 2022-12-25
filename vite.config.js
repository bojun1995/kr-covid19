import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //新增
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), //把 src 的别名设置为 @
    }
  }
})
