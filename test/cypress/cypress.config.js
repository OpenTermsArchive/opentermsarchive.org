const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1313',
    supportFile: false,
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
  },
})
