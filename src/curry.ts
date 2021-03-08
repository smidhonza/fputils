// type Curried<A extends any[], R> =
//   <P extends Partial<A>>(...args: P) => P extends A ? R :
//     A extends [...SameLength<P>, ...infer S] ? S extends any[] ? Curried<S, R>
//       : never : never;
//
// type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>
//
//
//
// export const curry = <A extends any[], R>(fn: (...args: A) => R): Curried<A, R> => {
//   return (...args: any[]): any =>
//     args.length >= fn.length ? fn(...args as any) : curry((fn).bind(undefined, ...args));
// }


export const curry = <F extends (...args: any) => any>(fn: F) => {
  const result = args => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => result([...args, ...secArgs]);
  };

  return (...args) => result(args);
};

