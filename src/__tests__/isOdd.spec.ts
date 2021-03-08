import { isOdd } from '../common';
import { compose } from '../compose';

describe("isOdd", () => {
  it("tell us when number is odd or even", () => {
    expect(isOdd(0)).toEqual(false);
    expect(isOdd(1)).toEqual(true);
    expect(isOdd(2)).toEqual(false);
    expect(isOdd(3)).toEqual(true);
    expect(compose(isOdd)(2)).toEqual(false);
    expect(compose(isOdd)(3)).toEqual(true);
  });
});
