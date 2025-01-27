type Fn1<T1, R> = (a: T1) => R;
type Fn2C1<T1, T2, R> = (a: T1) => Fn1<T2, R>;
type Fn2<T1, T2, R> = (a: T1, b: T2) => R;
type Fn3<T1, T2, T3, R> = (a: T1, b: T2, c: T3) => R;
type Fn3C1<T1, T2, T3, R> = (a: T1) => Fn2C1<T2, T3, R> & Fn2<T2, T3, R>;
type Fn3C2<T1, T2, T3,R> = (a: T1, b: T2) => Fn1<T3, R>;
type Fn4<T1, T2, T3, T4, R> = (a: T1, b: T2, c: T3, d: T4) => R;
type Fn4C1<T1, T2, T3, T4, R> = (a: T1) => Fn3<T2, T3, T4, R> & Fn3C2<T2, T3, T4, R> & Fn3C1<T2, T3, T4, R>;
type Fn4C2<T1, T2, T3, T4, R> = (a: T1, b: T2) => Fn2C1<T3, T4, R> & Fn2<T3, T4, R>;
type Fn4C3<T1, T2, T3, T4, R> = (a: T1, b: T2, c: T3) => Fn1<T4, R>;
type Fn5<T1, T2, T3, T4,T5, R> = (a: T1, b: T2, c: T3, d: T4, e: T5) => R;
type Fn5C1<T1, T2, T3, T4,T5, R> = (a: T1) => Fn4<T2, T3, T4, T5, R> & Fn4C1<T2, T3, T4, T5, R> & Fn4C2<T2, T3, T4, T5, R> & Fn4C3<T2, T3, T4, T5, R>;
type Fn5C2<T1, T2, T3, T4,T5, R> = (a: T1, b: T2) => Fn3<T3, T4, T5, R> & Fn3C1<T3, T4, T5, R> & Fn3C2<T3, T4, T5, R>;
type Fn5C3<T1, T2, T3, T4,T5, R> = (a: T1, b: T2, c: T3) => Fn2<T4, T5, R> & Fn2C1<T4, T5, R>;
type Fn5C4<T1, T2, T3, T4,T5, R> = (a: T1, b: T2, c: T3, d: T4) => Fn1<T5, R>;

export function curry<T1, R>(fn: Fn1<T1, R>): Fn1<T1, R>;
export function curry<T1, T2, R>(fn: Fn2<T1, T2, R>): (Fn2<T1, T2, R> & Fn2C1<T1, T2, R>);
export function curry<T1, T2, T3, R>(fn: Fn3<T1, T2, T3, R>): (Fn3<T1, T2, T3, R> & Fn3C1<T1, T2, T3, R> & Fn3C2<T1, T2, T3, R>);
export function curry<T1, T2, T3, T4, R>(fn: Fn4<T1, T2, T3, T4, R>): (Fn4<T1, T2, T3, T4, R> & Fn4C1<T1, T2, T3, T4, R> & Fn4C2<T1, T2, T3, T4, R> & Fn4C3<T1, T2, T3, T4, R>);
export function curry<T1, T2, T3, T4, T5, R>(fn: Fn5<T1, T2, T3, T4, T5, R>): (Fn5<T1, T2, T3, T4, T5, R> & Fn5C1<T1, T2, T3, T4, T5, R> & Fn5C2<T1, T2, T3, T4, T5, R> & Fn5C3<T1, T2, T3, T4, T5, R> & Fn5C4<T1, T2, T3, T4, T5, R>);

export function curry(fn) {
  const result = (args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...remaining) => result([...args, ...remaining]);
  };

  return (...args) => result(args);
};

