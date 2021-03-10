export type Compose = {
  <T, A>(a: (value: T) => A): (source: T) => A;
  <T, A, B>(b: (value: A) => B, a: (value: T) => A): (source: T) => B;
  <T, A, B, C>(c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => C;
  <T, A, B, C, D>(d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => D;
  <T, A, B, C, D, E>(e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => E;
  <T, A, B, C, D, E, F>(f: (value: E)=> F, e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => F;
  <T, A, B, C, D, E, F, G>(g: (value: F) => G, f: (value: E)=> F, e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => G;
  <T, A, B, C, D, E, F, G, H>(h: (value: G) => H, g: (value: F) => G, f: (value: E)=> F, e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => H;
  <T, A, B, C, D, E, F, G, H, I>(i: (value: H) => I, h: (value: G) => H, g: (value: F) => G, f: (value: E)=> F, e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => I;
  <T, A, B, C, D, E, F, G, H, I, J>(j: (value: I) => J, i: (value: H) => I, h: (value: G) => H, g: (value: F) => G, f: (value: E)=> F, e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => J;
  <T, A, B, C, D, E, F, G, H, I, J, K>(k: (value: J) => K, j: (value: I) => J, i: (value: H) => I, h: (value: G) => H, g: (value: F) => G, f: (value: E)=> F, e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => K;
}


export const compose: Compose = (...fns) => fns.reduce((f, fn) => (...args) => f(fn(...args)));
