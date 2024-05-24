
describe('Without Login', () => {
    it('verify that non-logged in users are not able to post', () => {
      // Visit the webpage where the form is located
      cy.visit('/community')
      cy.get('.community-section-filters-button-text').should('be.visible').and('not.be.disabled').click()
      cy.location('pathname').should('eq', '/auth/login')
      cy.get('h1').contains('Log in');
  
    })
    it.skip('verify that non-logged in users are not able to like', () => {
        // Visit the webpage where the form is located
        cy.visit('/community')
        cy.get('.fa-like').first().should('be.visible').click()
        cy.location('pathname').should('eq', '/auth/login')
        cy.get('h1').contains('Log in');
    
        
      })


      it.skip('check the newest record using filter', () => {
        // Visit the webpage where the form is located
        cy.visit('/community')
        cy.get('#sortBy').click()
        cy.get('.mat-selected > .mat-option-text').contains(' Newest ').click()
        cy.contains('Support Multiple Languages Expand language').click
    
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


it.skip('check the Oldest record using filter', () => {
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

it.skip('should allow typing and display the search term and handle no results scenario', () => {
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
    
  it.skip('Status Filter working', () => {
    cy.visit('/community')
    cy.get('#statusDropdown').click()
    cy.get('.mat-option-text').contains('Open').click()
    cy.get('.community-post').first().contains('OPEN')
  });    

//   it.skip('should allow typing and display the search term and handle no results scenario', () => {
//     // Visit the community page
//     cy.visit('/community')
  
//     // Generate a random search term
//     const search = generateRandomSearchTerm();
  
//     // Type the search term into the input field
//     cy.get('#search-text')
//       .should('be.visible')
//       .clear()
//       .type(search)
//       .should('have.value', search);
  
//     // Check if the search results container exists
//     cy.get('.community-section-content').then($results => {
//       if ($results.length > 0) {
//         // Search results found
//         cy.wrap($results).each(($result) => {
//           cy.wrap($result).should('contain.text', search);
//           cy.log('Search results found');
//         });
//       } else {
//         // No search results found
//         cy.log('No search results found for: ' + search);
//       }
//     });
  
//     // Clear the search input
//     cy.get('#search-text').clear();
  
//     // Type another search term
//     const newSearch = 'invisible';
//     cy.get('#search-text')
//       .type(newSearch)
//       .should('have.value', newSearch);
  
//     // Check if "No Results" message is visible
//     cy.get('#mat-tab-content-0-0').contains('No Results').should('be.visible');
//   });
  
//   function generateRandomSearchTerm() {
//     const possibleChars = 'abcdefghijklmnopqrstuvwxyz';
//     const searchTermLength = 5;
//     let searchTerm = '';
//     for (let i = 0; i < searchTermLength; i++) {
//       const randomIndex = Math.floor(Math.random() * possibleChars.length);
//       searchTerm += possibleChars[randomIndex];
//     }
//     return searchTerm;
//   } 
 });



 it('should handle both existing and non-existing search terms correctly', () => {
  cy.visit('/community');

  const testCases = [
      { term: 'This is a test feature idea', shouldExist: true },
      { term: 'nonexistent search term', shouldExist: false }
  ];

  testCases.forEach(testCase => {
      // Replace '#search-text' with the actual selector for your search field
      cy.get('#search-text').clear().type(testCase.term, { delay: 100 }).type('{enter}');

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








  // } else {
  //   // No results found
  //   cy.log('No search results found');
  //   // Add your assertions or actions for when no results are found
  // }


//   cy.visit('http://localhost:4200/community');
  
//   const search = 'test'; // Update the search term as needed
  
//   // Type the search term
//   cy.get('#search-text')
//     .should('be.visible')
//     .clear() // Clear any existing text before typing
//     .type(search)
//     .should('have.value', search);

//   // Check if any posts contain the search term
//   cy.get('#mat-tab-content-0-0 > .mat-tab-body-content').then(() => {
//     // Check if there are no posts
//     if(cy.get('.community-post')){
//       cy.get('.community-post').then(($posts) => {
//         $posts.each((index, post) => {
//           console.log(post)
//         });
//     });
//     }else{
//       cy.get('.community-section-content-posts-none').then(($noPosts) => {
//           if ($noPosts.length > 0) {
//               cy.contains('No Results').should('be.visible');
//           } else {
            
//           }
//       });
//     }
// });
  
  
  















        
        
        
        
      

  