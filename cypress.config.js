const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    specPattern: "./cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    experimentalStudio: true,
    pageLoadTimeout: 90000,
    baseUrl:"https://dev-dot-sqiblify.wl.r.appspot.com/",
    //STAGE_URL:"https://stage-dot-sqiblify.wl.r.appspot.com/",
    //PROD_URL:"https://squibler.io/",


    //baseUrl: "https://www.squibler.io",
    //baseUrl: "http://localhost:4200/auth/login",
    //baseUrl: "http://localhost:4200",
    viewportWidth: 1000,
    viewportHeight: 660,

    
    setupNodeEvents(on, config) { 
      
      // implement node event listeners here
    },
  },
});
