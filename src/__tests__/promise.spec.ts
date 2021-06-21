import { untilNotResolved, untilNotRight } from '../promise'
import { Left, Right } from '../either'

describe('untilNotResolved', () => {
  it('empty array', async () => {
      const res = await untilNotResolved([]);
      expect(res.tag).toBe('left');
      expect(res.value).toEqual(new Error('No promise resolved.'));
  });
  it('all rejected', async () => {
    const rejection = Promise.reject('No.');
    const res = await untilNotResolved([rejection, rejection, rejection]);

    expect(res.tag).toBe('left');
    expect(res.value).toEqual(new Error('No promise resolved.'));
  });
  it('returns resolved promise', async () => {
    const rejection = Promise.reject('No.');
    const resolution = Promise.resolve('Yes.');

    const res = await untilNotResolved([rejection, rejection, resolution]);

    expect(res.tag).toBe('right');
    expect(res.value).toEqual('Yes.');
  });
  it('returns first resolved promise', async () => {
    const rejection = Promise.reject('No.');

    const res = await untilNotResolved([rejection, Promise.resolve('Yes 0.'), rejection, Promise.resolve('Yes 1.')]);

    expect(res.tag).toBe('right');
    expect(res.value).toEqual('Yes 0.');
  });
});

describe('untilNotRight', () => {
  it('empty array', async () => {
    const res = await untilNotRight([]);
    expect(res.tag).toBe('left');
    expect(res.value).toEqual(new Error('No promise returned right.'));
  });
  it('all rejected', async () => {
    const rejection = Promise.resolve(Left(new Error('No.')));
    const res = await untilNotRight([rejection, rejection, rejection]);

    expect(res.tag).toBe('left');
    expect(res.value).toEqual(new Error('No promise returned right.'));
  });
  it('returns resolved promise', async () => {
    const rejection = Promise.resolve(Left(new Error('No.')));
    const resolution = Promise.resolve(Right('Yes.'));

    const res = await untilNotRight([rejection, rejection, resolution]);

    expect(res.tag).toBe('right');
    expect(res.value).toEqual('Yes.');
  });
  it('returns first resolved promise', async () => {
    const rejection = Promise.resolve(Left(new Error('No.')));

    const res = await untilNotRight([rejection, Promise.resolve(Right('Yes 0.')), rejection, Promise.resolve(Right('Yes 1.'))]);

    expect(res.tag).toBe('right');
    expect(res.value).toEqual('Yes 0.');
  });
});
