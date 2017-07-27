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

export const filter = curry((fn: Func, array: any[]): any[] => array.filter(fn));

const notEqual = (value) => compose(not, equals(value));
export const remove = curry((value: any, array: any[]): any[] => filter(notEqual(value), array));

const notEqualIndex = (index) => (_, i) => compose(not, equals(index))(i);

export const removeAt = curry((index: number, array: any[]): any[] => filter(notEqualIndex(index), array));
