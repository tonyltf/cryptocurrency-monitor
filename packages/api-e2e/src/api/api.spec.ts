import axios from 'axios';

describe('GET', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual('Hello World!');
  });
  ``
  it('should return a list', async () => {
    const res = await axios.get(`/list`);

    expect(res.status).toBe(200);
    expect(res.data['Bitcoin']).toContain('BTCUSDT');
    expect(res.data['Ether']).toContain('ETHUSDT');
  });
});
