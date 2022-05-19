import { curry } from './curry';
import { compose } from './compose';
import { modulo } from './modulo';

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];

export const not = curry(input => !input);


/**
 *
 * @param {Nullable<T> | undefined} expression
 * @return {boolean}
 */
export const bool = <T>(expression?: Nullable<T>): boolean => !!expression;

interface IsOdd {
  (number: number): boolean
}

export const isOdd: IsOdd = compose(bool, modulo(2));
export const alwaysTrue = (): true => true;
