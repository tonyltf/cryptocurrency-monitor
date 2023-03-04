describe('Web', () => {
  beforeEach(() => {
    cy.task('clearNock');
  });

  it('should show app with title', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').contains('Cryptocurrency Realtime price');
  });

  it('should show app with available currency list', () => {
    cy.task('nock', {
      hostname: 'http://localhost:8000',
      method: 'GET',
      path: '/list',
      statusCode: 200,
      body: {
        Bitcoin: 'BTCUSDT',
        Ether: 'ETHUSDT',
      },
    });
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=currencyList]')
      .children()
      .should('have.length.at.least', 1);
  });

  it('should show app with price listed', () => {
    cy.task('nock', {
      hostname: 'http://localhost:8000',
      method: 'GET',
      path: '/list',
      statusCode: 200,
      body: {
        Bitcoin: 'BTCUSDT',
        Ether: 'ETHUSDT',
      },
    });
    cy.intercept('GET', '/price?pair=BTCUSDT', {
      fixture: 'priceBTCUSDT.json',
    });
    cy.intercept('GET', '/price?pair=ETHUSDT', {
      fixture: 'priceETHUSDT.json',
    });
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=price]').should('not.be.empty');
  });
});
