/* eslint-disable no-undef */
describe('go to bigLottery test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  it('displays title', () => {
    cy.get('.display-5.fw-bold').first().should('have.text', '樂透');
  });
  it('navigate to biglottery', () => {
    cy.get('a[href="/BigLottery"]').click();
    cy.go('forward');
    cy.url().should('include', '/BigLottery');
  });
});
context('test create random number', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/BigLottery');
  });
  it('check button active', () => {
    cy.get('button.nav-link.active').should('have.text', '隨機產生');
    cy.intercept('GET', '*/biglottery/newlottery').as('getBigLottery');
    cy.get('button.btn.btn-outline-info').should('contain.text', '產出未出現').first().click();
    cy.wait('@getBigLottery').its('response.statusCode').should('equal', 200);
    cy.get('.col>.border-3.rounded-3').should('have.length', 6);
  });
});
