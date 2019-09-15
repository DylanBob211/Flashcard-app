export default function mockServer() {
  cy.server();
  cy.route({
    method: 'POST',
    url: '/translate',
    response: [{ name: 'sth' }],
  });
}