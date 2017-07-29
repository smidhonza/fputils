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

export const filter = curry(<T>(fn: Func, array: T[]): T[] => array.filter(fn));

// todo polyfill for es5
// export const find = curry(<T>(fn: Func, array: T[]): T | null => array.find(fn) || null);

const notEqual = (value) => compose(not, equals(value));
export const remove = curry(<T, R>(value: T, array: R[]): R[] => filter(notEqual(value), array));

const notEqualIndex = (index) => (_, i) => compose(not, equals(index))(i);

export const removeAt = curry(<T>(index: number, array: T[]): T[] => filter(notEqualIndex(index), array));

export const tail = <T>(array: T[]): T[] => array.slice(1);

