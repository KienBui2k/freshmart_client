import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"src"),
      "@services": `${path.resolve(__dirname, "./src/services/")}`,
       "@routes": `${path.resolve(__dirname, "./src/routes/")}`,
       "@slices": `${path.resolve(__dirname, "./src/stores/slices/")}`,
       "@utils": `${path.resolve(__dirname, "./src/pages/utils/")}`,
       "@users": `${path.resolve(__dirname, "./src/pages/users/")}`,
       "@components": `${path.resolve(__dirname, "./src/pages/components/")}`,
       "@interface": `${path.resolve(__dirname, "./src/interfaces/")}`,
    }
  }
})
