export default function createList(listName) {
  cy.get('[data-test="addNewListButton"]')
    .click();
  cy.get('[data-test="newListTextInput"]')
    .type(listName);
  cy.get('[data-test="submitNewListButton"]')
    .click();
}