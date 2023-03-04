import { Card } from './Card';
import color from '@/lib/modules/color.module.css';

describe('Card', () => {
  it('should render a Card component', () => {
    cy.mount(
      <Card
        key="BTCUSD"
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
  });
});
