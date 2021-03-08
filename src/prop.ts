import { curry } from './curry';
import { equals, ValueOf } from './common';
import { compose } from './compose';

type Prop = <T extends object>(property: keyof T, object: T) => ValueOf<T>;

type PropCurried = {
  <T>(property: keyof T, object: T): ValueOf<T>;
  <T>(property: keyof T): (object: T) => ValueOf<T>;
}

export const prop: PropCurried = curry<Prop>((property, object) => object[property]);

export type PropEq = <T, V>(property: keyof T, value: V, object: T) => boolean;

type PropEqCurried = {
  <T, V>(property: keyof T, value: V, object: T): boolean;
  <T, V>(property: keyof T, value: V): (object: T) => boolean;
}

export const propEq: PropEqCurried = curry<PropEq>((property, value, object) => compose(equals(value), prop(property))(object));
