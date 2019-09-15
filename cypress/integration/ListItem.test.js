import createList from '../helpers/createList';

const listName = 'Hello List';

describe('Deleting a list', () => {
  it('deletes a list from the screen', () => {
    cy.visit('http://localhost:3000/main');

    createList(listName);

    cy.contains('Hello List')
      .siblings('.listItem_iconbox')
      .children('[data-test="deleteListIconButton"]')
      .click();

    cy.contains('Hello List').should('not.exist');
  });
});

describe('Opening a practice session', () => {
  it('opens a practice session by clicking on the play button of a list', () => {
    cy.visit('http://localhost:3000/main');

    createList(listName);

    cy.contains(listName)
      .siblings('.listItem_iconbox')
      .children('[data-test="startListPracticeSessionButton"]')
      .click();

    cy.get('[data-test="exerciseSettingsPanelTest"]').should('exist');
  });
});
