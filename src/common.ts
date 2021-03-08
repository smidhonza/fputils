import { curry } from './curry';
import { compose } from './compose';
import { modulo } from './modulo';

export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];


export const not = curry(input => !input);


const toBool = (number: number): boolean => !!number;

interface IsOdd {
  (number: number): boolean
}

export const isOdd: IsOdd = compose(toBool, modulo(2));


export interface Equals {
  <T1, T2>(a: T1, b: T2): boolean;

  <T1, T2>(a: T1): (b: T2) => boolean;
}

export const equals: Equals = curry((a: any, b: any): boolean => a === b);

export const notEqual = value => compose(not, equals(value));
