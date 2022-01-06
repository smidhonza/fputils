import { equals } from "../equals";
import { alwaysTrue } from "../common";
import { cond } from "../cond";

describe('cond', () => {
  it('should return undefined when no condition is met', () => {
    expect(cond([[equals('a'), () => 'a'], [equals('b'), () => 'b'], [equals('c'), () => 'c']], 'd')).toEqual(undefined);
  });

  it('should return value given when first condition is met', () => {
    expect(cond([[equals('a'), () => 'ok value']], 'a')).toEqual('ok value');
  });

  it('should return modified value', () => {
    expect(cond([[equals(5), (a) => a + 10]], 5)).toEqual(15);
  });

  it('should return first true condition', () => {
    expect(cond([
      [equals('a'), () => 'a'],
      [equals('b'), () => 'b condition']
    ], 'b')).toEqual('b condition');
  });

  it('should return value on different types', () => {
    expect(cond([
      [equals('x'), () => 'not ok'],
      [equals('b'), () => 5]
    ], 'b')).toEqual(5);
  });

  it('should return default value on true compare function', () => {
    expect(cond([[equals('a'), () => 'a'], [alwaysTrue, () => 'default']], 'c')).toEqual('default');
  });

  it('should work uncurried', () => {
    const result = cond([[equals('a'), () => 'a']]);
    expect(result('a')).toEqual('a');
  });
});
