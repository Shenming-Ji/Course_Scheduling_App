import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Update baseUrl if your dev server runs on a different port
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
})