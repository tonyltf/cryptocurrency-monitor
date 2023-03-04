import PriceCard from './PriceCard';

describe('PriceCard.cy.tsx', () => {
  it('should render and display expected content on BTC price', () => {
    cy.intercept('GET', '/price?pairs=BTCUSDT', {
      fixture: 'priceBTCUSDT.json',
    });
    cy.mount(<PriceCard name="Bitcoin" pair="BTCUSDT" />);
    cy.get('[data-cy=card]').should('have.length.at.least', 1);
    cy.get('[data-cy=cardTitle]').should('contain.text', 'Bitcoin');
    cy.get('[data-cy=cardSubtitle]').should('contain.text', '$25000');
    cy.get('[data-cy=cardItemChangeValue]').should('contain.text', '2000');
    cy.get('[data-cy=cardItemChangeValue]').should(
      'have.css',
      'color',
      'rgb(0, 128, 0)'
    );
  });

  it('should render and display expected content on ETH price', () => {
    cy.intercept('GET', '/price?pairs=ETHUSDT', {
      fixture: 'priceETHUSDT.json',
    });
    cy.mount(<PriceCard name="Ether" pair="ETHUSDT" />);
    cy.get('[data-cy=card]').should('have.length.at.least', 1);
    cy.get('[data-cy=cardTitle]').should('contain.text', 'Ether');
    cy.get('[data-cy=cardSubtitle]').should('contain.text', '$4000');
    cy.get('[data-cy=cardItemChangeValue]').should('contain.text', '-200');
    cy.get('[data-cy=cardItemChangeValue]').should(
      'have.css',
      'color',
      'rgb(255, 0, 0)'
    );
  });
});
