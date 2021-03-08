import { notEqual, Optional } from './common';
import { curry } from './curry';
import { compose } from './compose';
import { foldr } from './foldr';

export const head: <T>(array: T[]) => Optional<T> = array => array[0];

export interface Remove {
  <T>(remove: T, from: T[]): T[];

  <T>(remove: T): (from: T[]) => T[];
}
export const remove: Remove = curry(
  <T, R>(value: T, array: R[]): R[] => filter(notEqual(value), array)
);


export const tail = <T>(array: T[] = []): T[] => array.slice(1);

export const concat = curry((head, tail) => head.concat(tail));


export const prepend = <T>(value: any, array: T[]): T[] => [value].concat(array);

export interface Find {
  <T>(func: (bit: T) => boolean, array: T[]): Optional<T>;

  <T>(func: (bit: T) => boolean): (array: T[]) => Optional<T>;
}

export const find: Find = curry(
  (func, array) =>
    compose(
      head,
      filter(func)
    )(array) || undefined
);

export interface Map {
  <T, R>(func: (bit: T) => R, over: T[]): R[];

  <T, R>(func: (bit: T) => R): (over: T[]) => R[];
}


export const filter: Map = curry((func, array) =>
  foldr((head, tail) => {
    if (func(head)) return prepend(head, tail);

    return tail;
  }, [], array));


export const map: Map = curry((func, array) =>
  foldr((head, tail) => prepend(func(head), tail), [], array)
);
