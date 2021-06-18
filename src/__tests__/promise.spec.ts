import { untilResolved } from '../promise'

describe('untilResolved', () => {
  it('empty array', async () => {
      const res = await untilResolved([]);
      expect(res.tag).toBe('left');
      expect(res.value).toEqual(new Error('No promise resolved.'));
  });
  it('all rejected', async () => {
    const rejection = Promise.reject('No.');
    const res = await untilResolved([rejection, rejection, rejection]);

    expect(res.tag).toBe('left');
    expect(res.value).toEqual(new Error('No promise resolved.'));
  });
  it('returns resolved promise', async () => {
    const rejection = Promise.reject('No.');
    const resolution = Promise.resolve('Yes.');

    const res = await untilResolved([rejection, rejection, resolution]);

    expect(res.tag).toBe('right');
    expect(res.value).toEqual('Yes.');
  });
  it('returns first resolved promise', async () => {
    const rejection = Promise.reject('No.');

    const res = await untilResolved([rejection, Promise.resolve('Yes 0.'), rejection, Promise.resolve('Yes 1.')]);

    expect(res.tag).toBe('right');
    expect(res.value).toEqual('Yes 0.');
  });
});
