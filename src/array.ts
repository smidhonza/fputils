import { notEqual, Optional } from './common';
import { curry } from './curry';

export const head: <T>(array: T[]) => Optional<T> = array => array[0];
export const tail = <T>(array: T[] = []): T[] => array.slice(1);
export const isArray = <T>(array: T | T[]): array is T[] => Array.isArray(array);

export const toArray = <T>(value: T | T[]): T[] => (isArray(value) ? value : [value]);


export type Remove = {
  <T>(remove: T, from: T[]): T[];
  <T>(remove: T): (from: T[]) => T[];
}
export const remove: Remove = curry(
  <T, R>(value: T, array: R[]): R[] => filter(notEqual(value), array)
);

export type Concat = {
  <A, B>(a: A, b: B): A;
  <A, B>(a: A): (b: B) => A;
}
export const concat: Concat = curry((head, tail) => head.concat(tail));

export const prepend = <T>(value: any, array: T[]): T[] => [value].concat(array);

export type Find = {
  <T>(func: (bit: T) => boolean, array: T[]): Optional<T>;
  <T>(func: (bit: T) => boolean): (array: T[]) => Optional<T>;
}
export const find: Find = curry((func, array) => array.find(func));

export type Filter = {
  <T>(func: (a: T, index: number) => boolean, over: T[]): T[];
  <T>(func: (a: T, index: number) => boolean): (over: T[]) => T[];
}

export const filter: Filter = curry((func, array) => array.filter(func));


export type Map = {
  <T, R>(func: (a: T, index: number) => R, over: T[]): R[];
  <T, R>(func: (a: T, index: number) => R): (over: T[]) => R[];
}

export const map: Map = curry((func, array) => (array.map(func)));
