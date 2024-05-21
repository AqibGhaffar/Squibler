describe('template Modals', () => {
  it('passes', () => {
    cy.visit('https://practice-automation.com/modals/')
    cy.get('#simpleModal').click()
    cy

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#popmake-1318 > .pum-close').click();
    cy.get(':nth-child(1) > p > a').click();
    /* ==== End Cypress Studio ==== */
  })
})