export type Func = (a: any) => any;
export type Func2 = (a: any, b: any) => any;

export type Optional<T> = T | undefined;

export const curry: (func: (...args: any[]) => any) => any = (func: (...args: any[]) => any) => {
  const r = args => {
    if (args.length >= func.length) {
      return func(...args);
    }
    return (...secArgs) => r([...args, ...secArgs]);
  };

  return (...args) => r(args);
};

export interface Equals {
  <T1, T2, R>(a: T1, b: T2): R;
  <T1, T2>(a: T1): (b: T2) => boolean;
}

export const equals: Equals = curry((a: any, b: any): boolean => a === b);

export const compose = (...functions) => functions.reduce((f, fn) => (...args) => f(fn(...args)));

export const not = curry(input => !input);

export const prop = curry((property, object) => object[property]);

export interface PropEq {
  <T>(property: string, value: T, object: object): boolean;
  <T>(property: string, value: T): (object: object) => boolean;
}
export const propEq: PropEq = curry((property, value, object = {}) => equals(prop(property, object), value));

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
  if (value.length === 0) return initial;

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
