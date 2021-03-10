export const curry = <F extends (...args: any) => any>(fn: F) => {
  const result = args => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => result([...args, ...secArgs]);
  };

  return (...args) => result(args);
};

