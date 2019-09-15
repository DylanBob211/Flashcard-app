import createWord from '../helpers/createWord';
import mockServer from '../helpers/mockServer';

describe('Adding a word to a list', () => {
  const listName = 'Hello List';
  const wordName = 'Test word';
  it('adds a word to a list', () => {
    mockServer();
    cy.visit('http://localhost:3000/main');

    createWord(wordName, listName);

    cy.contains(wordName).should('exist');

  });
});
