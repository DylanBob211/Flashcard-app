describe('Adding a new list', () => {
  it('Adds a new ListItem component to the ListArray', () => {
    cy.visit('http://localhost:3000/main');

    // Pressing the plus button should show a text input
    cy.get('[data-test="newListTextInput"]')
      .should('not.exist');

    cy.get('[data-test="addNewListButton"]')
      .click();

    cy.get('[data-test="newListTextInput"]')
      .should('exist');

    // Pressing the X button should close the input and newly show the plus btn
    cy.get('[data-test="closeNewListInputButton"]')
      .click();

    cy.get('[data-test="newListTextInput"]')
      .should('not.exist');

    cy.get('[data-test="newListTextInput"]')
      .should('not.exist');

    cy.get('[data-test="addNewListButton"]')
      .should('exist');

    // An error message should be rendered if submitted without text
    cy.get('[data-test="addNewListButton"]')
      .click();

    cy.get('[data-test="submitNewListButton"]')
      .click();

    cy.get('[data-test="errorModal"]')
      .should('exist');

    cy.contains('Input a name for the list');

    // Inputting and saving should make a new List appear
    cy.get('[data-test="newListTextInput"]')
      .type('New List');
    // Inputting makes errorModal disappear
    cy.get('[data-test="errorModal"]')
      .should('not.exist');

    cy.get('[data-test="submitNewListButton"]')
      .click();

    cy.contains('New List');

    // Once new list is created should close the form and display the button

    cy.get('[data-test="newListTextInput"]')
      .should('not.exist');

    cy.get('[data-test="addNewListButton"]')
      .should('exist');
  });
});
