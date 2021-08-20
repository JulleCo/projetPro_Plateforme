
// const loginReq=(username, password, setError) => {
//   cy.get("username").type(username);

//   cy.get("password").type(password);
//   cy.get("button").click();
// };

context("[Test case] Authentication component where user does not exist", () => {

  it('should show Connexion page', () => {
    cy.visit('http://localhost:3000/connexion'); 
  });
  
  it("should show and complete input form", () => {
    cy.get("form");

    cy.get('input#emailSignin')
      .should('have.value', '')
      .type('fake@email.com').should('have.value', 'fake@email.com');

    cy.get('input#passSignin')
      .should('have.value', '')
      .type('123Azerty').should('have.value', '123Azerty');
  });

  it('should be able to click on Button component and submit', () => {
    cy.get('.actionBtn').click(); // Click on button
    cy.focused().click();

  });

});

context("[Test case] Authentication request", () => {
  it("should connect with success", () => {
    cy.request(
        'POST',
        'http://localhost:1234/signin',
        {
          email: "cafe@cafe.com",
          errorMessage:	null,
          isSubmitting:	false,
          password:	"123Azerty"
        }
      )
      .then((response) => {
        expect(response).property('status').to.equal(200) // OK
      });
  });

  // it("should not connect because not authorized", () => {
  //   cy.intercept(
  //       'http://localhost:1234/signin',
  //       {
  //         email: "cafe@cafe.com",
  //         errorMessage:	null,
  //         isSubmitting:	false,
  //         password:	"falsePassword"
  //       }
  //     )
  //     .as('login')
  //   cy.wait('@login').its('response.statusCode').should('eq', 401)


    // cy.wait('@login').should(({request, response}) => {
    //   expect(request).to.include(
    //     'POST',
    //     'http://localhost:1234/signin',
    //     {
    //       email: "cafe@cafe.com",
    //       errorMessage:	null,
    //       isSubmitting:	false,
    //       password:	"falsePassword"
    //     }
    //   )
    //   expect(response.status).to.eq(401)
    // })

  //   cy.request(
  //       'POST',
  //       'http://localhost:1234/signin',
  //       {
  //         email: "cafe@cafe.com",
  //         errorMessage:	null,
  //         isSubmitting:	false,
  //         password:	"falsePassword"
  //       }, 
  //       {failOnStatusCode: false}
  //     )
  //     .then((response) => {
        
  //       expect(response.status).to.eq(401)
  //       // expect(response).property('status').to.equal(401) // not authorized
  //       expect(response.body).to.have.property('title', 'description')
  //     });
  // });
});