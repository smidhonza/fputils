import { curry } from './curry';
import { not } from './common';
import { pipe } from "./pipe";

export type Equals = {
  <A, B>(a: A, b: B): boolean;
  <A, B>(a: A): (b: B) => boolean;
}
export const equals: Equals = curry((a, b) => a === b);

export type NotEqual = {
  <A, B>(a: A, b: B): boolean;
  <A, B>(a: A): (b: B) => boolean;
}
export const notEqual: NotEqual = curry((a,b) => pipe(equals(a,b), not));

