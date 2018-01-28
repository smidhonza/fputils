export type Func = (a: any) => any;
export type Func2 = (a: any, b: any) => any;


export const curry: (func: (...args: any[]) => any) => any = (func: (...args: any[]) => any) => {
  const r = (args) => {
    if (args.length >= func.length) {
      return func(...args);
    }
    return (...secArgs) => r([...args, ...secArgs]);
  };

return (...args) => r(args);
};


export interface Equals {
  <T1, T2, R>(a: T1, b: T2): R
  <T1, T2>(a: T1): (b: T2) => boolean
}

export const equals: Equals = curry((a: any, b: any): boolean => a === b);

export const compose = (...functions: Func[]) => (value: any) => functions.reduceRight((args, fn) => fn(args), value);

export const not = curry((input) => !input);

export const prop = curry((property, object) => object[property]);

export interface PropEq {
  <T>(property: string, value: T, object: object): boolean
  <T>(property: string, value: T) : (object: object) => boolean
}
export const propEq: PropEq = curry((property: string, value: any, object: {} = {}) => equals(prop(property, object), value));

export const isOdd = (value: number): boolean => compose(not, equals(0))(value % 2);

const notEqual = (value) => compose(not, equals(value));
export const remove = curry(<T, R>(value: T, array: R[]): R[] => filter(notEqual(value), array));

export const head: <T>(array: T[]) => T | undefined = array => array[0];

export const tail = <T>(array: T[]): T[] => array.slice(1);

const lens = get => set => ({ get, set });

export const view = curry((lens, obj) => lens.get(obj));

export const set = curry((lens, value, object) => lens.set(value)(object));

export const over = curry((lens, fn, obj) => set(lens)(fn(view(lens)(obj)))(obj));

export const assoc = curry((key, value, object) => ({ ...object, [key]: value }));

export const lensProp = (key: string) => lens(prop(key))(assoc(key));

export const concat = curry((head, tail) => head.concat(tail));

export interface Foldr {
  <Initial, Value, Result>(a: Func2, b: Initial, c: Value[]): Result
  <Initial, Value, Result>(a: Func2, b: Initial): (c: Value[]) => Result
}

export const foldr: Foldr = curry((fn, initial, value) => {
  if (value.length === 0) return initial;

  return fn(head(value), foldr(fn, initial, tail(value)));
});


const prepend = <T>(value: any, array: T[]): T[] => [value].concat(array);

export interface Map {
  <T, R>(a: Func, b: T[]): R[]
  <T, R>(a: Func): (b: T[]) => R[]
}

export const map: Map = curry((func, array) => foldr((head, tail) => prepend(func(head), tail), [], array));

export const filter: Map = curry((func, array) => {
  const x = (head, tail) => {
    if (func(head)) return prepend(head, tail);

    return tail;
  };

  return foldr(x, [], array);
});

export interface Find {
  <T>(func: Func, array: T[]): T | null
  <T>(func: Func) : (array: T[]) => T | null
}

export const find: Find = curry((func, array) => compose(head, filter(func))(array) || null);
