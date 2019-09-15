import createList from './createList';

// use only after mockServer

export default function (wordName, listName) {
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
}
