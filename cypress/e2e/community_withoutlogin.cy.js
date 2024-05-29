
describe('Without Login', () => {
  it('verify that non-logged in users are not able to post', () => {
    // Visit the webpage where the form is located
    cy.visit('/community')
    cy.get('.community-section-filters-button-text').should('be.visible').and('not.be.disabled').click()
    cy.location('pathname').should('eq', '/auth/login')
    cy.get('h1').contains('Log in');

  })
  it('verify that non-logged in users are not able to like', () => {
      // Visit the webpage where the form is located
      cy.visit('/community')
      cy.get('.fa-like').first().should('be.visible').click()
      cy.location('pathname').should('eq', '/auth/login')
      cy.get('h1').contains('Log in');
  
      
    })


    it('check the newest record using filter', () => {
      // Visit the webpage where the form is located
      cy.visit('/community')
      cy.get('#sortBy').click()
      cy.get('.mat-selected > .mat-option-text').contains(' Newest ').click()
      // cy.contains('Support Multiple Languages Expand language').click
  
      const divDataArray = [];
      const div = '.community-post-detail-title';
      // Store div data in an array
      cy.get(div).each(($div) => {
        divDataArray.push($div.text());
      }).then(() => {
        // Now divDataArray contains the text of each div
        // You can apply your filter or other logic here
        console.log('All div data:', divDataArray);
  
        // Get text from the first div
        cy.get(div).eq(0).invoke('text').then((text) => {
        
          cy.log('Text from the first div:', text);
          
  // Assert that the selected title exists on the page
  cy.get(".community-post-detail-title").eq(0).should("contain", text)


});
})
})


it.only('check the Oldest record using filter', () => {
// Visit the webpage where the form is located
cy.visit('/community')
cy.get('#sortBy').click()
cy.get('.mat-option-text').contains('Oldest').click()
// cy.contains('Support Multiple Languages Expand language').click

const divDataArray = [];
const div = '.community-post-detail-title';
// Store div data in an array
cy.get(div).each(($div) => {
  divDataArray.push($div.text());
}).then(() => {
  // Now divDataArray contains the text of each div
  // You can apply your filter or other logic here
  console.log('All div data:', divDataArray);

  // Get text from the first div
  cy.get(div).eq(0).invoke('text').then((text) => {
  
    cy.log('Text from the first div:', text);
    
// Assert that the selected title exists on the page
cy.get(".community-post-detail-title").eq(0).should("contain", text);


cy.get('#sortBy').click()
cy.get('.mat-option-text').contains('Oldest').click()

cy.get(div).last().invoke('text').then((text) => {
  
  cy.log('Text from the last div:', text);



});
})
})
})

it('should allow typing and display the search term and handle no results scenario', () => {
cy.visit('/community')

const search = 'test';

cy.get('#search-text')
  .should('be.visible')
  .clear()
  .type(search)
  .should('have.value', search);

cy.get('.community-section-content').then($results => {
    cy.wrap($results).each(($result) => {
      cy.wrap($result).should('contain.text', search);
      cy.log('Search results found')
      
    });
    
  });
  cy.get('#search-text').clear()
      cy.get('#search-text').type('invisible')
      cy.get('#mat-tab-content-0-0').contains('No Results').should('be.visible')
});
  
it('Status Filter working', () => {
  cy.visit('/community')
  cy.get('#statusDropdown').click()
  cy.get('.mat-option-text').contains('Open').click()
  cy.get('.community-post').first().contains('OPEN')
});    

});



it('should handle both existing and non-existing search terms correctly', () => {
cy.visit('/community');

const testCases = [
    { term: 'This is a test feature idea', shouldExist: true },
    { term: 'nonexistent search term', shouldExist: false }
];

testCases.forEach(testCase => {
  cy.intercept('POST', '**/squibler-api**').as('searchRequest');
    // Replace '#search-text' with the actual selector for your search field
    cy.get('#search-text').clear().type(testCase.term, { delay: 100 }).type('{enter}');
    cy.wait('@searchRequest');

    if (testCase.shouldExist) {
        // Replace '.community-section-content' with the actual selector for the search results
        cy.get('.community-section-content', { timeout: 10000 })
            .contains(testCase.term)
            .should('be.visible');
    } else {
        // Replace '#mat-tab-content-0-0' with the actual selector for the no results message
        cy.get('#mat-tab-content-0-0', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'No Results.'); // Adjust the message text as necessary
    }

    // Adding a small wait time for search results to load before running the next test case
    cy.wait(1000); // Adjust as necessary
});
});

describe('Dropdown Filter Verification', () => {
  const statuses = [
      { status: 'Done', shouldExist: true },
      { status: 'In Progress', shouldExist: true },
      { status: 'Open', shouldExist: true },
      
  ];

  statuses.forEach(({ status, shouldExist }) => {
      it(`should filter results by ${status} status correctly`, () => {
          // Visit the community page before each test case
          cy.visit('/community');

          // Wait for the dropdown to be visible and then click
          cy.get('#statusDropdown', { timeout: 10000 }).should('be.visible').click(); // Replace with the actual dropdown selector
          cy.get('.mat-option-text').contains(status, { timeout: 10000 }).click(); // Replace with actual dropdown option selector

          if (shouldExist) {
              // Verify that results with the status flag are visible
              cy.get('.community-post-status', { timeout: 10000 }).each(($el) => { // Replace with actual status selector
                  cy.wrap($el)
                      .invoke('text')
                      .then(text => {
                          expect(text.trim().toLowerCase()).to.eq(status.toLowerCase());
                      });
              });
          } else {
              // Verify that 'No Results' message is visible
              cy.get('#mat-tab-content-0-0', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'No Results.'); // Replace with actual 'No Results' message selector
          }
          
          // Adding a small wait time before running the next test case
          cy.wait(1000); // Adjust as necessary
      });
  });
});


















      
      
      
      
    

