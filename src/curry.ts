type Curried<A extends any[], R> =
  <P extends Partial<A>>(...args: P) => P extends A ? R :
    A extends [...SameLength<P>, ...infer S] ? S extends any[] ? Curried<S, R>
      : never : never;

type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>


export const curry = <F extends any[], R>(fn: (...args: F) => R): Curried<F, R> => {
  const result = args => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => result([...args, ...secArgs]);
  };

  return (...args): any => result(args);
};
