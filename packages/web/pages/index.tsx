import { Suspense } from 'react';
import styled from 'styled-components';
import flex from '../lib/modules/flex.module.css';
import PriceCard from '../lib/components/PriceCard';

const CardContiner = styled.div``;

export default function Web(props: any) {
  const { currencyList = {} } = props;
  return (
    <div>
      <h1>Cryptocurrency Realtime price</h1>
      {currencyList && (
        <CardContiner className={flex.parent} data-testid="currencyList">
          {Object.keys(currencyList).map((key) => (
            <Suspense key={key} fallback={<p>Loading price...</p>}>
              <PriceCard name={key} pair={currencyList[key]} />
            </Suspense>
          ))}
        </CardContiner>
      )}
    </div>
  );
}
export async function getServerSideProps() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  try {
    const res = await fetch(`${process.env.SERVER_API_PATH}/list`);
    const currencyList = await res.json();
    return { props: { currencyList } };
  } catch (e) {
    console.log('Get currency list error');
    console.log(e);
  }
  return { props: {} };
}
