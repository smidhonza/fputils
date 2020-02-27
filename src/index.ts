export type Func = (a: any) => any;
export type Func2 = (a: any, b: any) => any;

export type Optional<T> = T | undefined;
type ValueOf<T> = T[keyof T];

export const curry = <F extends (...args: any) => any>(fn: F) => {
  const result = args => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => result([...args, ...secArgs]);
  };

  return (...args) => result(args);
};

export interface Equals {
  <T1, T2>(a: T1, b: T2): boolean;

  <T1, T2>(a: T1): (b: T2) => boolean;
}

export const equals: Equals = curry((a: any, b: any): boolean => a === b);

export const compose = (...fns: any[]) => fns.reduce((f, fn) => (...args) => f(fn(...args)));

export const not = curry(input => !input);

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

export interface Modulo {
  (divisor: number, dividend: number): number

  (divisor: number): (dividend: number) => number
}

export const modulo: Modulo = curry((divisor, dividend) => dividend % divisor);

const toBool = (number: number): boolean => !!number;

interface IsOdd {
  (number: number): boolean
}

export const isOdd: IsOdd = compose(toBool, modulo(2));

const notEqual = value => compose(not, equals(value));

export interface Remove {
  <T>(remove: T, from: T[]): T[];

  <T>(remove: T): (from: T[]) => T[];
}
export const remove: Remove = curry(
  <T, R>(value: T, array: R[]): R[] => filter(notEqual(value), array)
);

export const head: <T>(array: T[]) => Optional<T> = array => array[0];

export const tail = <T>(array: T[] = []): T[] => array.slice(1);

const lens = get => set => ({ get, set });

export const view = curry((lens, obj) => lens.get(obj));

export const set = curry((lens, value, object) => lens.set(value)(object));

export const over = curry((lens, fn, obj) => set(lens)(fn(view(lens)(obj)))(obj));

export const assoc = curry((key, value, object) => ({ ...object, [key]: value }));

export const lensProp = (key: string) => lens(prop(key))(assoc(key));

export const concat = curry((head, tail) => head.concat(tail));

export interface Foldr {
  <Initial, Value, Result>(a: Func2, b: Initial, c: Value[]): Result;

  <Initial, Value, Result>(a: Func2, b: Initial): (c: Value[]) => Result;
}

export const foldr: Foldr = curry((fn, initial, value) => {
  if (!value || value.length === 0) return initial;

  return fn(head(value), foldr(fn, initial, tail(value)));
});

const prepend = <T>(value: any, array: T[]): T[] => [value].concat(array);

export interface Map {
  <T, R>(func: (bit: T) => R, over: T[]): R[];

  <T, R>(func: (bit: T) => R): (over: T[]) => R[];
}

export const map: Map = curry((func, array) =>
  foldr((head, tail) => prepend(func(head), tail), [], array)
);

export const filter: Map = curry((func, array) =>
  foldr((head, tail) => {
    if (func(head)) return prepend(head, tail);

    return tail;
  }, [], array));

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

export const path = <T>(...bits: string[]) => (object: object): Optional<T> => {
  const [property, ...rest] = bits;
  if (object[property]) {
    if (head(rest)) {
      return path<T>(...rest)(object[property]);
    }
    return object[property];
  }
  return undefined;
};
