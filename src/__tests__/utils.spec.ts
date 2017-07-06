import {
  curry,
  compose,
  not,
  prop,
  propEq,
} from "../utils";

describe("utils", () => {
  describe("compose", () => {
    it("returns composed result", () => {
      const add5 = a => a + 5;
      const add10 = a => a + 10;

      expect(compose(add10, add5)(20)).toEqual(35);
      expect(compose(add10, add5, add5, add10, add5)(7)).toEqual(42);
    })
  });

  describe("curry", () => {
    it("returns a curried sum function", () => {
      const sum = curry((a, b, c, d) => a + b + c + d);
      expect(sum(1, 2, 3, 4)).toEqual(10);
    });

    it("returns a function if you miss the params", () => {
      const sum = curry((a, b, c, d) => a + b + c + d);

      const sum1 = sum(1);
      const sum2 = sum1(2);
      const sum3 = sum2(3);
      expect(sum3(4)).toEqual(10);
    });

    it("combines the two approaches and still returns correct values", () => {
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
  });

});
