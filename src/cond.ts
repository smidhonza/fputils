import { Optional } from "./common";
import { head, tail } from "./array";
import { curry } from "./curry";

type Arg<T, V> = [condFn: (value: T) => boolean, resolve: (value: T) => V];

type CondPartial = {
  <T, V>(args: [Arg<T, V>]): (value: T) => Optional<V>;
  <T, V1, V2>(args: [Arg<T, V1>, Arg<T, V2>]): (value: T) => Optional<V1 | V2>;
  <T, V1, V2, V3>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>]): (value: T) => Optional<V1 | V2 | V3>;
  <T, V1, V2, V3, V4>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>]): (value: T) => Optional<V1 | V2 | V3 | V4>;
  <T, V1, V2, V3, V4, V5>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>]): (value: T) => Optional<V1 | V2 | V3 | V4 | V5>;
  <T, V1, V2, V3, V4, V5, V6>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>]): (value: T) => Optional<V1 | V2 | V3 | V4 | V5 | V6>;
  <T, V1, V2, V3, V4, V5, V6, V7>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>]): (value: T) => Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7>;
  <T, V1, V2, V3, V4, V5, V6, V7, V8>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>, Arg<T, V8>]): (value: T) => Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8>;
  <T, V1, V2, V3, V4, V5, V6, V7, V8, V9>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>, Arg<T, V8>, Arg<T, V9>]): (value: T) => Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V9>;
  <T, V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>, Arg<T, V8>, Arg<T, V9>, Arg<T, V10>]): (value: T) => Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V10>;
}

type CondNormal = {
  <T, V>(args: [Arg<T, V>], value: T): Optional<V>;
  <T, V1, V2>(args: [Arg<T, V1>, Arg<T, V2>], value: T): Optional<V1 | V2>;
  <T, V1, V2, V3>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>], value: T): Optional<V1 | V2 | V3>;
  <T, V1, V2, V3, V4>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>], value: T): Optional<V1 | V2 | V3 | V4>;
  <T, V1, V2, V3, V4, V5>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>], value: T): Optional<V1 | V2 | V3 | V4 | V5>;
  <T, V1, V2, V3, V4, V5, V6>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>], value: T): Optional<V1 | V2 | V3 | V4 | V5 | V6>;
  <T, V1, V2, V3, V4, V5, V6, V7>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>], value: T): Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7>;
  <T, V1, V2, V3, V4, V5, V6, V7, V8>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>, Arg<T, V8>], value: T): Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8>;
  <T, V1, V2, V3, V4, V5, V6, V7, V8, V9>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>, Arg<T, V8>, Arg<T, V9>], value: T): Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V9>;
  <T, V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>(args: [Arg<T, V1>, Arg<T, V2>, Arg<T, V3>, Arg<T, V4>, Arg<T, V5>, Arg<T, V6>, Arg<T, V7>, Arg<T, V8>, Arg<T, V9>, Arg<T, V10>], value: T): Optional<V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V10>;
}

type Cond = CondNormal & CondPartial;

const condNormal = <T,V>(args: Arg<T, V>[], value: T): Optional<V> => {
  const first = head(args);
  if (!first) {
    return undefined;
  }

  const [condFn, resolve] = first;
  if (condFn(value)) {
    return resolve(value);
  }

  return condNormal(tail(args), value);
}

export const cond: Cond = curry(condNormal);
