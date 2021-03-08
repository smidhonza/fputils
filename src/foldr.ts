import { curry } from './curry';
import { head, tail } from './array';

type Func2 = (a: any, b: any) => any;

export interface Foldr {
  <Initial, Value, Result>(a: Func2, b: Initial, c: Value[]): Result;

  <Initial, Value, Result>(a: Func2, b: Initial): (c: Value[]) => Result;
}

export const foldr: Foldr = curry((fn, initial, value) => {
  if (!value || value.length === 0) return initial;

  return fn(head(value), foldr(fn, initial, tail(value)));
});
