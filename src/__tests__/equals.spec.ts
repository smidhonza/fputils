import { equals, notEqual } from "../equals";

describe("equals functions", () => {
  describe('equals', () => {
    it("compares 2 numbers", () => {
      expect(equals(4, 4)).toEqual(true);
      expect(equals(4, 2)).toEqual(false);
      expect(equals(3)(3)).toEqual(true);
      expect(equals(3)(1)).toEqual(false);
    });
  })

  describe('notEqual', () => {
    it('compare not equal values and return true', () => {
      expect(notEqual(false)(true)).toEqual(true);
      expect(notEqual(0)(false)).toEqual(true);
      expect(notEqual('')(false)).toEqual(true);
      expect(notEqual(NaN)(NaN)).toEqual(true);
      expect(notEqual('a')('b')).toEqual(true);
      expect(notEqual({})({})).toEqual(true);
      expect(notEqual([])([])).toEqual(true);
    })

    it('compare equal values', () => {
      expect(notEqual(0,0)).toEqual(false);
      expect(notEqual('a','a')).toEqual(false);
      expect(notEqual(undefined,undefined)).toEqual(false);

      const obj = { a: 'a' }
      expect(notEqual(obj, obj)).toEqual(false);
    })
  })
});
