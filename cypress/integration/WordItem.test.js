import createList from '../helpers/createList';

describe('Shows FlashcardPreview on Hovering', () => {
  const listName = 'Hello List';
  it('renders flashcard preview when mouseover event is triggered', () => {
    cy.visit('http://localhost:3000/main');

    createList(listName);
    cy.contains(listName);
  });
});
