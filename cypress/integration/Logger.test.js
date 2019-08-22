describe('Logger page', () => {
  it('Redirects to the logger', () => {
    cy.visit('http://localhost:3000');

    // Can't click because no language selected
    cy.get('[data-test="firstLoggerScreenNextButton"]')
      .should('be.disabled');

    // Can click because language has been selected
    cy.get('[data-test="firstLoggerScreenLanguageSelection"]')
      .select('Italian');

    cy.get('[data-test="firstLoggerScreenNextButton"]')
      .should('not.be.disabled');

    // Renders another card after click
    cy.get('[data-test="firstLoggerScreenNextButton"]')
      .click()
      .should('not.exist');

    cy.get('[data-test="secondLoggerScreenBackButton"]')
      .should('exist');

    // If go back button is pressed, the language "from" is still selected
    cy.get('[data-test="secondLoggerScreenBackButton"]')
      .click();

    cy.get('[data-test="firstLoggerScreenLanguageSelection"]')
      .should('have.value', 'it');

    cy.get('[data-test="firstLoggerScreenNextButton"]')
      .click();

    // Can't click continue button because no language "to" selected yet
    cy.get('[data-test="secondLoggerScreenNextButton"')
      .should('be.disabled');

    // Can't select Italian because already selected previously
    cy.get('select[data-test="secondLoggerScreenLanguageSelection"] option[value="it"]')
      .should('be.disabled');

    // After selecting another language it enables continue button
    cy.get('[data-test="secondLoggerScreenLanguageSelection"]')
      .select('Russian');

    cy.get('[data-test="secondLoggerScreenNextButton"]')
      .should('not.be.disabled');

    // After clicking on the continue button it redirects you to the main application
    cy.get('[data-test="secondLoggerScreenNextButton"]')
      .click();

    cy.url().should('eq', 'http://localhost:3000/main');

  });
});
