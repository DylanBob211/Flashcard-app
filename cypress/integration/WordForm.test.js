import createList from '../helpers/createList';

describe('Adding a word to a list', () => {
  const listName = 'Hello List';
  const wordName = 'Test word'
  it('adds a word to a list', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '/translate',
      response: [{ name: 'sth' }],
    });

    cy.visit('http://localhost:3000/main');

    createList(listName);

    cy.contains(listName)
      .parent()
      .siblings('.wordForm_container')
      .children('.wordForm_input')
      .type(wordName);

    cy.contains(listName)
      .parent()
      .siblings('.wordForm_container')
      .children('[data-test="addWordButtonTest"]')
      .click();

    cy.contains(wordName);

  });
});
