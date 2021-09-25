import { curry } from './curry';
import { compose } from './compose';
import { modulo } from './modulo';

export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];

export const not = curry(input => !input);


/**
 *
 * @param {number | string} expression
 * @return {boolean}
 */
export const bool = (expression: number | string): boolean => !!expression;

interface IsOdd {
  (number: number): boolean
}

export const isOdd: IsOdd = compose(bool, modulo(2));

