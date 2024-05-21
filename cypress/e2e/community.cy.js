import 'cypress-file-upload'
let testData;

beforeEach(() => {

    cy.fixture('login').then(function(data){
                   testData = data
    cy.login('mokabat280@felibg.com','betarayS#123')
   
      })
    })
    it('Go to Community page accessible after login', () => {
      cy.visit('/auth/login')
      cy.get('.arrows > .fak').click()
      cy.contains(' Suggest a feature').click()
      cy.location('pathname').should('eq', '/community');

    });
    it.skip('verify that filters exist .i.e. search, sortBy, status', () => {
      cy.visit('/auth/login')
      cy.get('.arrows > .fak').click()
      cy.contains(' Suggest a feature').click()
      cy.location('pathname').should('eq', '/community');
      cy.get('#search-text[placeholder="Search"]').should('exist')
      cy.get('#sortByDropdown').contains('Sort by: Newest').should('exist')
      cy.get('#status').contains('Status: All').should('exist')
      cy.wait(2000)

    });
    it.skip('verify that Add Post Button exists', () => {
      cy.visit('/auth/login')
      cy.get('.arrows > .fak').click()
      cy.contains(' Suggest a feature').click()
      cy.location('pathname').should('eq', '/community');
      cy.get('.community-section-filters-button-text').should('be.visible').and('not.be.disabled');

    });
    it('verify that modal for post creation opens for logged in users', () => {
      cy.visit('/auth/login')
      cy.get('.arrows > .fak').click()
      cy.contains(' Suggest a feature').click()
      cy.location('pathname').should('eq', '/community');
      cy.get('.community-section-filters-button-text').should('be.visible').and('not.be.disabled').click()
      cy.get('.col-11').should('contain', ' Create post ');

    });
    
    it.skip('verify that save button is disabled when fields are empty', () => {
      cy.visit('/auth/login')
      cy.get('.arrows > .fak').click()
      cy.contains(' Suggest a feature').click()
      cy.location('pathname').should('eq', '/community');
      cy.get('.community-section-filters-button-text').should('be.visible').and('not.be.disabled').click()
      cy.get('.col-11').should('contain', ' Create post ')
      cy.get('#mat-input-1').should('have.value', '')
      cy.get('#mat-input-2').should('have.value', '')
      cy.get('.community-post-modal-button-send').should('be.visible').and('be.disabled')

    });

    it.skip('verify that the image is being uploaded or not', () => {
      cy.visit('/auth/login')
      cy.get('.arrows > .fak').click()
      cy.contains(' Suggest a feature').click()
      cy.location('pathname').should('eq', '/community');
      cy.get('.community-section-filters-button-text').should('be.visible').and('not.be.disabled').click()
      cy.get('.col-11').should('contain', ' Create post ')
      cy.get('#mat-input-1').type('Support Multiple Languages')
      cy.get('#mat-input-2').type('Expand language support to cater to a global user base.')
      cy.get('.community-post-modal-button-send').should('be.visible').and('not.be.disabled')

      const filepath = "image.jpg"
      cy.get("input[type = 'file']").attachFile(filepath)
      cy.get('.community-post-modal-button-send').should('be.visible').click()
      cy.wait(1000)
      cy.get('.community-snackbar-text').should('contain.text', ' Your feedback is moderating now. It will take till 24 hours.')
        
        })
    it.skip('Like the Post', () => {
          cy.visit('/auth/login')
          cy.get('.arrows > .fak').click()
          cy.contains(' Suggest a feature').click()
          cy.location('pathname').should('eq', '/community')

          cy.get('.fa-like').first().click();

    // Get the initial count
    let initialCount;
    cy.get('.community-post-likes-counter').first().invoke('text').then((text) => {
        initialCount = parseInt(text);
    });

    // Wait for a moment to let the count update
    cy.wait(1000);

    // Verify that the count has increased
    cy.get('.community-post-likes-counter').first().invoke('text').then((text) => {
        const updatedCount = parseInt(text);
        expect(updatedCount).to.be.greaterThan(initialCount);
    });

          
            })
      
  
    
  
    
    
   



