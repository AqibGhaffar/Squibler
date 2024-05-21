
Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error, handle it, or prevent Cypress from failing the test
    return false;
  });

  Cypress.Commands.add('login', (email, password) => {
    // Navigate to the login page
    cy.session(['mokabat280@felibg.com','betarayS#123'],() => {
    cy.visit('/auth/login');
    //cy.contains('Log In').click({ force: true });
    cy.location('pathname').should('eq', '/auth/login');
  
    // Enter email and continue
    cy.get("input[placeholder='Enter your email']").type(email);
    cy.get('.singup-btn > span').contains('Continue with email').click();
    cy.wait(4000);
  
    // Enter password and log in
    cy.get("input[formcontrolname='password']").type(password);
    cy.get('.singup-btn').click();
    cy.wait(30000);
  
    // Verify successful login by checking the redirected path
    cy.location('pathname').should('eq', '/dashboard/all-your-writing');
  
  })
  Cypress.Commands.add('deleteItem', () => {
    cy.get('.mat-button-wrapper > .fas').click()
      cy.get('.mat-menu-content > :nth-child(9)').contains('Delete').click()
      cy.get('.projects__delete-yes-button').contains('yes').click()
  });
  Cypress.Commands.add('FileUploadDragandDrop', () => {
    cy.get('.container-3 > .mat-focus-indicator').click()
    cy.get('.upload-box__inner-container').attachFile("sample.docx",{subjectType:"drag-n-drop"});
    cy.wait(5000);
  });

  Cypress.Commands.add('GenerateScene', () => {

    cy.wait(3000)
  cy.get('.container-13').contains('sample').click()
  cy.wait(3000)
  cy.get('#usecaseDropdown > .mat-form-field-wrapper > .mat-form-field-flex').click()
  cy.wait(3000)
  cy.contains(' Generate scene ').click()
  //cy.get('#elementDemo').click().contains('Charles Dickens').click()
  cy.get('#descriptionTextArea').type('Poetry')
  cy.get('.col-12 > .btn').contains('Generate').click()
  cy.wait(2000)
  cy.get('.clear-all-button').click()
    
  });

  Cypress.Commands.add('Rewrite', () => {
    cy.wait(3000)
  cy.get('.container-13').contains('sample').click()
  cy.wait(3000)
  cy.get('#usecaseDropdown > .mat-form-field-wrapper > .mat-form-field-flex').click()
  cy.get('#useCaseOptions-rewrite > .mat-option-text').click()
  //cy.get('#elementDemo').click().contains('Charles Dickens').click()
   cy.get('#rewriteType').click()
   cy.get('.mat-selected > .mat-option-text').contains(' Rephrase ').click()
   cy.get('.ql-editor > :nth-child(12)')
   .trigger('mousedown', { button: 0 }) // Trigger a mouse down event
  .trigger('mousemove', { clientX: 10, clientY: 10 }) // Move the mouse to simulate selection
  .trigger('mouseup', { force: true });
  cy.get('.col-12 > .btn').click({force: true});

    
  });

  

 // commands.js



  
 

})
import 'cypress-file-upload';