import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "7sdu13",
  e2e: {
    specPattern: "./cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    experimentalStudio: true,
    pageLoadTimeout: 90000,
    //baseUrl:"https://dev-dot-sqiblify.wl.r.appspot.com/",
    //STAGE_URL:"https://stage-dot-sqiblify.wl.r.appspot.com/",
    //PROD_URL:"https://squibler.io/",


    //baseUrl: "https://www.squibler.io",
    //baseUrl: "http://localhost:4200/auth/login",
    //baseUrl: "http://localhost:4200",
    viewportWidth: 1000,
    viewportHeight: 660,
    retries: {
      runMode: 2,  // Number of retries when running in `cypress run`
      openMode: 2, // Number of retries when running in `cypress open`
    },
    setupNodeEvents(on, config) {
      const environment = config.env.environment || 'development';

      const urls = {
        development: "https://dev-dot-sqiblify.wl.r.appspot.com/",
        staging: "https://stage-dot-sqiblify.wl.r.appspot.com/",
        production: "https://squibler.io/"
      };

      config.baseUrl = urls[environment];
      return config;
      
      // implement node event listeners here
      
    },
  },
});
