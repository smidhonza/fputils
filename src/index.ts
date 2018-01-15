type Func = (arg: any) => any;

export const curry = (fn: (...x: any[]) => any) => {
  const r = (args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => r([...args, ...secArgs]);
  };

  return (...args) => r(args);
};

export const equals = curry((a, b): boolean => a === b);


export const compose = (...fns: Func[]) => (value: any) => fns.reduceRight((args, fn) => fn(args), value);

export const not = curry((input) => !input);

export const prop = curry((property, object) => object[property]);

export const propEq = (property, value) => (object = {}) => equals(prop(property, object), value);

export const isOdd = (value: number): boolean => compose(not, equals(0))(value % 2);

const notEqual = (value) => compose(not, equals(value));
export const remove = curry(<T, R>(value: T, array: R[]): R[] => filter(notEqual(value), array));

export const head = <T>(array: T[]): T => array[0];

export const tail = <T>(array: T[]): T[] => array.slice(1);

const lens = get => set => ({ get, set });

export const view = curry((lens, obj) => lens.get(obj));

export const set = curry((lens, value, object) => lens.set(value)(object));

export const over = curry((lens, fn, obj) => set(lens)(fn(view(lens)(obj)))(obj));

export const assoc = curry((key, value, object) => ({ ...object, [key]: value }));

export const lensProp = (key: string) => lens(prop(key))(assoc(key));

export const concat = curry((head, tail) => head.concat(tail));

export const foldr = curry((fn, initial, array) => {
  if (array.length === 0) return initial;

  return fn(head(array), foldr(fn, initial, tail(array)));
});


const prepend = <T>(value: any, array: T[]): T[] => [value].concat(array);

export const map = curry((fn, array) => foldr((head, tail) => prepend(fn(head), tail), [], array));

export const filter = curry((fn, array) => {
  const x = (head, tail) => {
    if (fn(head)) return prepend(head, tail);

    return tail;
  };

  return foldr(x, [], array);
});
