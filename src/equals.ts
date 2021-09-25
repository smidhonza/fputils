import { curry } from './curry';
import { compose } from './compose';
import { not } from './common';

export type Equals = {
  <A, B>(a: A, b: B): boolean;
  <A, B>(a: A): (b: B) => boolean;
}
export const equals: Equals = curry((a, b) => a === b);

export const notEqual: <A, B>(a: A) => (b: B) => boolean = (value) => compose(not, equals(value));

