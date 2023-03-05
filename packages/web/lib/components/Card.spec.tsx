import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Card } from './Card';
import color from '../modules/color.module.css';

describe('Card', () => {
  it('should render a Card component', () => {
    const { baseElement } = render(
      <Card
        key="BTCUSDT"
        title="Bitcoin"
        subtitle="$25000"
        items={[
          {
            label: 'Volume',
            value: '10000',
            className: color.grey,
          },
          {
            label: 'change',
            value: '100',
            className: color.green,
          },
        ]}
      />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('card').innerHTML).toContain('Bitcoin');
  });
});
