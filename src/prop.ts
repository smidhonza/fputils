import { curry } from './curry';
import { equals, ValueOf } from './common';
import { pipe } from './pipe';

type Prop = {
  <T>(property: keyof T, object: T): ValueOf<T>;
  <T>(property: keyof T): (object: T) => ValueOf<T>;
}

export const prop: Prop = curry(<T>(property: keyof T, object: T) => object[property]);

type PropEq = {
  <T, V>(property: keyof T, value: V, object: T): boolean;
  <T, V>(property: keyof T, value: V): (object: T) => boolean;
}

export const propEq: PropEq = curry(<T, V>(property: keyof T, value: V, object: T) => pipe(object, prop(property), equals(value)));
