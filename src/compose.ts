export const compose = (...fns: any[]) => fns.reduce((f, fn) => (...args) => f(fn(...args)));
