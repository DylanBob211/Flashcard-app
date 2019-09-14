describe('Deleting a list', () => {
  const listName = 'Hello List';

  it('deletes a list from the screen', () => {
    cy.visit('http://localhost:3000/main');

    testOpenListForm(listName);
    cy.contains('Hello List');

    cy.contains('Hello List')
      .siblings('.listItem_iconbox')
      .children('[data-test="deleteListIconButton"]')
      .click();

    cy.contains('Hello List').should('not.exist');
  });
});

function testOpenListForm(listName) {
  cy.get('[data-test="addNewListButton"]')
    .click();
  cy.get('[data-test="newListTextInput"]')
    .type(listName);
  cy.get('[data-test="submitNewListButton"]')
    .click();
}
