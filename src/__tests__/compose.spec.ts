import { compose } from "../compose";

describe("compose", () => {
  it("returns composed result", () => {
    const add5 = a => a + 5;
    const add10 = a => a + 10;

    expect(compose(add10, add5)(20)).toEqual(35);
    expect(compose(add10, add5, add5, add10, add5)(7)).toEqual(42);
  });

  it("returns a partially applied function", () => {
    const add5 = a => a + 5;
    const add10 = a => a + 10;

    const add15 = compose(add10, add5);

    expect(add15(20)).toEqual(35);
    expect(compose(add15, add5)(5)).toEqual(25);
  });

  it("returns fetched async data", async () => {
    const data = { id: 8 };
    const Future = async (promise) => await Promise.resolve(promise);

    const wait = () => new Promise((resolve) => setTimeout(resolve, 0));

    const fetchExample = async url => {
      await wait();
      return data;
    };

    const fetch = compose(Future, fetchExample);

    expect(await fetch("url-to-fetch")).toEqual(data);
  });
});
