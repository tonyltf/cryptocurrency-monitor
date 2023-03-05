import { getHeader } from '../support/app.po';

describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display app title`', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getHeader().contains('Cryptocurrency Realtime price');
  });

  it('should display cryptocurrency price list', () => {
    cy.get("[data-testId=currencyList]")
      .children()
      .should("have.length.at.least", 1);
    cy.get("[data-testId=currencyList]").should("contain.text", "Bitcoin")
  });

});
