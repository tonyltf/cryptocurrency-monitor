import { useEffect, useState } from 'react';
import { Card } from './Card';
import { TPriceCard, getPrice } from '@/lib/ticker';
import width from '@/lib/modules/size.module.css';
import color from '@/lib/modules/color.module.css';

export default function PriceCard({
  name,
  pair,
}: {
  name: string;
  pair: string;
}) {
  const [priceInfo, setPriceInfo] = useState<TPriceCard>({ name, pair });
  useEffect(() => {
    const fetchCurrencyPrice = async () => {
      try {
        const priceInfo = await getPrice(pair);
        setPriceInfo({
          name,
          pair,
          ...priceInfo.find((p) => p.symbol === pair),
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrencyPrice();
  }, [name, pair]);

  return (
    <div className={width.twoFifty}>
      <Card
        data-cy="priceCard"
        key={pair}
        title={name || ''}
        subtitle={`$${priceInfo?.price || ''}`}
        items={[
          {
            label: 'Volume',
            value: priceInfo?.volume?.toString() || '-',
            className: color.grey,
          },
          {
            label: 'Change',
            value: priceInfo?.change?.toString() || '-',
            className:
              (priceInfo?.change || 0) < 0
                ? color.red
                : ((priceInfo?.change || 0) > 0 && color.green) || color.grey,
          },
        ]}
      />
    </div>
  );
}
