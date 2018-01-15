import {
  equals,
  curry,
  compose,
  concat,
  map,
  filter,
  not,
  prop,
  propEq,
  remove,
  isOdd,
  head,
  tail,
  assoc,
  lensProp,
  set,
  view,
  over,
  foldr,
} from './index';

describe('FP utils', () => {
  describe('equals', () => {
    it('compares 2 numbers', () => {
      expect(equals(4, 4)).toEqual(true);
      expect(equals(4, 2)).toEqual(false);
      expect(equals(3)(3)).toEqual(true);
      expect(equals(3)(1)).toEqual(false);
    });
  });

  describe('compose', () => {
    it('returns composed result', () => {
      const add5 = a => a + 5;
      const add10 = a => a + 10;

      expect(compose(add10, add5)(20)).toEqual(35);
      expect(compose(add10, add5, add5, add10, add5)(7)).toEqual(42);
    })
  });

  describe('curry', () => {
    it('returns a curried sum function', () => {
      const sum = curry((a, b, c, d) => a + b + c + d);
      expect(sum(1, 2, 3, 4)).toEqual(10);
    });

    it('returns a function if you miss the params', () => {
      const sum = curry((a, b, c, d) => a + b + c + d);

      const sum1 = sum(1);
      const sum2 = sum1(2);
      const sum3 = sum2(3);
      expect(sum3(4)).toEqual(10);
    });

    it('combines the two approaches and still returns correct values', () => {
      const sum = curry((a, b, c, d) => a + b + c + d);

      const sum1 = sum(1, 2);
      const sum2 = sum1(3);
      expect(sum2(4)).toEqual(10);
    });
  });


  describe('prop', () => {
    it('returns right property when passed in as two params', () => {
      expect(prop('name', { name: 'test 1' })).toEqual('test 1');
    });

    it('returns right property when curried', () => {
      expect(prop('name')({ name: 'test 152' })).toEqual('test 152');
    });
  });

  describe('propEq', () => {
    it('returns right property match', () => {
      expect(propEq('name', 'test 1')({ name: 'test 1' })).toEqual(true);
      expect(propEq('name', 'test 2')({ name: 'test 1' })).toEqual(false);
      expect(propEq('name', 'test')()).toEqual(false);
    });
  });

  describe('not', () => {
    it('negate the input value', () => {
      expect(not(true)).toEqual(false);
      expect(not(false)).toEqual(true);
      expect(not(1)).toEqual(false);
      expect(not(0)).toEqual(true);
      expect(not('')).toEqual(true);
      expect(not(null)).toEqual(true);
    });

    it('negate the input value curried', () => {
      expect(not()(true)).toEqual(false);
      expect(not()(false)).toEqual(true);
    });
  });

  describe('concat', () => {
    it('concatinate', () => {
      expect(concat([1, 2], [3])).toEqual([1, 2, 3]);
      expect(concat('hel', 'lo')).toEqual('hello');
      expect(concat('curr')('ied')).toEqual('curried');

    })
  });

  describe('map', () => {
    it('maps over given array', () => {
      const doubles = number => number * 2;

      expect(map(doubles, [2, 4])).toEqual([4, 8]);
      expect(map(doubles)([1])).toEqual([2]);
      expect(map(doubles)([])).toEqual([]);
    })
  });

  describe('remove', () => {
    it('remove value from array and won\'t modify the current array', () => {
      const list = ['a', 'b', 'c'];
      expect(remove('c', list)).toEqual(['a', 'b']);
      expect(list).toEqual(['a', 'b', 'c']);
    });

    it('remove won\'t modify the array when the value does not exist in that array', () => {
      const list = ['a', 'b'];
      expect(remove('c', list)).toEqual(['a', 'b']);
    });

    it('removes curried', () => {
      expect(remove('b')(['a', 'b', 'c'])).toEqual(['a', 'c']);
      expect(remove(' - ')([' - ', 'b', 'c', ''])).toEqual(['b', 'c', '']);
    })
  });

  describe('filter', () => {
    const minTwo = number => number >= 2;

    it('filters', () => {


      expect(filter(minTwo, [1, 2, 3, 4])).toEqual([2, 3, 4]);
      expect(filter((string) => string !== 'a', ['a', 'b'])).toEqual(['b']);
    });

    it('filters curried', () => {
      expect(filter(minTwo)([1, 2, 3, 4])).toEqual([2, 3, 4]);
      expect(filter((string) => string !== 'a')(['a', 'b'])).toEqual(['b']);
    });
  });

  describe('isOdd', () => {
    it('tell us when number is odd or even', () => {
      expect(isOdd(0)).toEqual(false);
      expect(isOdd(1)).toEqual(true);
      expect(isOdd(2)).toEqual(false);
      expect(isOdd(3)).toEqual(true);
      expect(compose(isOdd)(2)).toEqual(false)
      expect(compose(isOdd)(3)).toEqual(true)
    });
  });

  describe('head', () => {
    it('returns first element from array', () => {
      expect(head(['a', 'b', 'c'])).toEqual('a');
      expect(head([])).toEqual(undefined);
      expect(compose(head)(['r', 'f'])).toEqual('r')
    });
  });

  describe('tail', () => {
    it('remove head from array', () => {
      expect(tail(['a', 'b', 'c'])).toEqual(['b', 'c']);
      expect(compose(tail)(['a', 'b'])).toEqual(['b'])
    });
  });


  describe('assoc', () => {
    it('should work', () => {
      expect(assoc('a', 3, { b: 4 })).toEqual({ a: 3, b: 4 });
      expect(assoc('a', 1)({})).toEqual({ a: 1 });

    });
  });

  describe('lensProp', () => {
    it('should do lensing with view', () => {
      const nameLens = lensProp('name');

      expect(view(nameLens, { name: 'A' })).toEqual('A');
      expect(view(nameLens)({ name: 'B' })).toEqual('B');
    });

    it('should do lensing with set', () => {
      const nameLens = lensProp('name');

      expect(set(nameLens, 'X', { name: 'C' })).toEqual({ name: 'X' });
      expect(set(nameLens, 'V')({ name: 'D' })).toEqual({ name: 'V' });
    });
  });

  describe('over', () => {
    it('should apply a function to the lens', () => {
      const nameLens = lensProp('name');
      const toUpper = string => string ? string.toUpperCase() : undefined;

      expect(over(nameLens, toUpper, { a: 'b' })).toEqual({ a: 'b' });
      expect(over(nameLens, toUpper, { name: 'honza' })).toEqual({ name: 'HONZA' });
      expect(over(nameLens, toUpper)({ name: 'curried' })).toEqual({ name: 'CURRIED' });
    });
  });


  describe('foldr', () => {
    it('should work', () => {
      const add = (a, b) => a + b;

      expect(foldr(add, 1, [2, 3])).toEqual(6);
      expect(foldr(add, 2)([4, 6])).toEqual(12);
    });
  });
});
