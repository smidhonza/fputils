import { curry } from './curry';
import { head, tail } from './array';

type Func2 = (a: any, b: any) => any;

export type Foldr = {
  <B, V, T>(a: Func2, b: B, c: V[]): T;
  <B, V, T>(a: Func2, b: B): (c: V[]) => T;
}

export const foldr: Foldr = curry((fn, initial, value) => {
  if (!value || value.length === 0) return initial;

  return fn(head(value), foldr(fn, initial, tail(value)));
});
