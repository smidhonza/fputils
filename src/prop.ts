import { curry } from './curry';
import { equals, ValueOf } from './common';

type Prop = <T extends object>(property: keyof T, object: T) => ValueOf<T>;

interface PropCurried {
  <T extends object>(property: keyof T, object: T): ValueOf<T>;

  <T extends object>(property: keyof T): (object: T) => ValueOf<T>;
}

export const prop: PropCurried = curry<Prop>((property, object) => object[property]);

export type PropEq = <T extends object, V>(property: keyof T, value: V, object: T) => boolean;

interface PropEqCurried {
  <T extends object, V>(property: keyof T, value: V, object: T): boolean;
  <T extends object, V>(property: keyof T, value: V): (object: T) => boolean;
}

export const propEq: PropEqCurried = curry<PropEq>((property, value, object) => equals(prop(property, object), value));
