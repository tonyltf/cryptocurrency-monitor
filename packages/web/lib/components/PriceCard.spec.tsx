import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import PriceCard from './PriceCard';
// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('http://localhost:8000/price', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json([
        {
          symbol: 'BTCUSDT',
          price: 25000,
          volume: 10000,
          change: 2000,
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PriceCard', () => {
  it('should render and display expected content on BTC price', async () => {
    const { baseElement } = render(<PriceCard name="Bitcoin" pair="BTCUSDT" />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('cardTitle').innerHTML).toContain('Bitcoin');
    
    await waitFor(() => expect(screen.getByTestId('cardSubtitle').innerHTML).toContain('$25000'));
    expect(screen.getByTestId('cardItemChangeValue').innerHTML).toContain('2000');
    expect(screen.getByTestId('cardItemChangeValue').className).toContain('green');
  });
});
