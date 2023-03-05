import axios from 'axios';

describe('GET', () => {

  it('should return a message', async () => {
    const res = await axios.get(`/`);
    const { data, status } = res;

    expect(status).toBe(200);
    expect(data).toEqual('Hello World!');
  });

  it('should return a list', async () => {
    const res = await axios.get(`/list`);
    const { data, status } = res;

    expect(status).toBe(200);
    expect(data?.['Bitcoin']).toContain('BTCUSDT');
    expect(data?.['Ether']).toContain('ETHUSDT');
  });

  it('should return single price', async () => {
    const res = await axios.get(`/price?pairs=BTCUSDT`);
    const { data, status } = res;

    expect(status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data?.[0]?.symbol).toContain('BTCUSDT');
    expect(data?.[0]?.price).toBeGreaterThan(0);
  });

  it('should return multiple price', async () => {
    const res = await axios.get(`/price?pairs=BTCUSDT&pairs=ETHUSDT`);
    const { data, status } = res;
    expect(status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data?.[0]?.symbol).toContain('BTCUSDT');
    expect(data?.[0]?.price).toBeGreaterThan(0);
    expect(data?.[1]?.symbol).toContain('ETHUSDT');
    expect(data?.[1]?.price).toBeGreaterThan(0);
  });
});
