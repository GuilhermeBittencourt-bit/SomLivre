import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Configuração do Vitest (testes unitários)
  test: {
    include: ['tests/**/*.test.js'], // onde ficam os testes
    coverage: {
      provider: 'v8',
      include: ['src/logic/**'], // mede cobertura só da camada de regras de negócio
    },
  },
})
