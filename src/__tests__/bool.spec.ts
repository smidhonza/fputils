import {bool} from "../common";

describe('bool', () => {
  it('should return boolean value', () => {
    expect(bool(true)).toEqual(true)
    expect(bool(false)).toEqual(false)
    expect(bool(0)).toEqual(false)
    expect(bool(1)).toEqual(true)
    expect(bool('')).toEqual(false)
    expect(bool(undefined)).toEqual(false)
    expect(bool(null)).toEqual(false)
    expect(bool({})).toEqual(true)
    expect(bool('a')).toEqual(true)
    expect(bool({a: 'a'})).toEqual(true)
    expect(bool([])).toEqual(true)
    expect(bool([1])).toEqual(true)
  })
})
