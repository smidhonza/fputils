const equal = (a, b): boolean => a === b;

export const curry = (fn: (...x: any[]) => any) => {
  const r = (args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => r([...args, ...secArgs]);
  };

  return (...args) => r(args);
};


type Func = (arg: any) => any;
export const compose = (...fns: Func[]) => (value: any) => fns.reduceRight((args, fn) => fn(args), value);

export const not = (input) => !input;

export const prop = curry((property, object) => object[property]);

export const propEq = (property, value) => (object = {}) => equal(prop(property, object), value);
