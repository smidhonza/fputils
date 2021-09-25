import { omit } from '../omit';

describe('omit', () => {
  it('omits nothing', () => {
    const attributes = { a: ['ok'] };
    expect(omit(['x'], attributes)).toEqual(attributes);
  });

  it('omits one attribute', () => {
    const attributes = { a: ['ok'], b: ['a', 'b'] };
    expect(omit(['b'], attributes)).toEqual({ a: ['ok'] });
  });

  it('omits one attribute curried', () => {
    expect(omit(['b', 'c'])({ a: 9, b: 8, c: 9 })).toEqual({ a: 9 });
  });
});
