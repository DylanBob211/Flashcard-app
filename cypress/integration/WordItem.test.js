import createWord from '../helpers/createWord';
import mockServer from '../helpers/mockServer';

describe('WordItem', () => {
  const listName = 'Hello List';
  const wordName = 'Word test';

  beforeEach(() => {
    mockServer();
    cy.visit('http://localhost:3000/main');
    createWord(wordName, listName);
  });

  describe('Showing FlashcardPreview on Hovering', () => {
    it('renders flashcard preview when mouseover event is triggered', () => {
      cy.get('.wordPreview_container')
        .should('not.exist');

      cy.contains(wordName)
        .trigger('mouseover');

      cy.get('.wordPreview_container')
        .should('exist');
    });
  });

  describe('Deleting WordItem', () => {
    it('deletes a word item when clicks the minus button', () => {
      cy.contains(wordName)
        .siblings('.wordItem_remove')
        .click();

      cy.contains(wordName).should('not.exist');
    });
  });

  describe('Opening Flashcard', () => {
    it('opens a flashcard when wordItem is clicked', () => {  
      cy.get('.practiceWindow_container').should('not.exist');

      cy.contains(wordName)
        .click();

      cy.get('.practiceWindow_container').should('exist');
    });
  });
});
