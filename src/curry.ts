export interface CurryFunction1<T1, R> {
  (arg1: T1): R;
}

export interface CurryFunction2<T1, T2, R> {
  (arg1: T1): CurryFunction1<T2, R>;

  (arg1: T1, arg2: T2): R;
}

export interface CurryFunction3<T1, T2, T3, R> {
  (arg1: T1): CurryFunction2<T2, T3, R>;

  (arg1: T1, arg2: T2): CurryFunction1<T3, R>;

  (arg1: T1, arg2: T2, arg3: T3): R;
}

export interface CurryFunction4<T1, T2, T3, T4, R> {
  (arg1: T1): CurryFunction3<T2, T3, T4, R>;

  (arg1: T1, arg2: T2): CurryFunction2<T3, T4, R>;

  (arg1: T1, arg2: T2, arg3: T3): CurryFunction1<T4, R>;

  (arg1: T1, arg2: T2, arg3: T3, arg4: T4): R;
}

export interface CurryFunction5<T1, T2, T3, T4, T5, R> {
  (arg1: T1): CurryFunction4<T2, T3, T4, T5, R>;

  (arg1: T1, arg2: T2): CurryFunction3<T3, T4, T5, R>;

  (arg1: T1, arg2: T2, arg3: T3): CurryFunction2<T4, T5, R>;

  (arg1: T1, arg2: T2, arg3: T3, arg4: T4): CurryFunction1<T5, R>;

  (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): R;
}

export interface CurryFunction6<T1, T2, T3, T4, T5, T6, R> {
  (arg1: T1): CurryFunction5<T2, T3, T4, T5, T6, R>;

  (arg1: T1, arg2: T2): CurryFunction4<T3, T4, T5, T6, R>;

  (arg1: T1, arg2: T2, arg3: T3): CurryFunction3<T4, T5, T6, R>;

  (arg1: T1, arg2: T2, arg3: T3, arg4: T4): CurryFunction2<T5, T6, R>;

  (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): CurryFunction1<T6, R>;

  (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6): R;
}


export function curry<T1, R>(fn: (arg1: T1) => R): CurryFunction1<T1, R>;
export function curry<T1, T2, R>(fn: (arg1: T1, arg2: T2) => R): CurryFunction2<T1, T2, R>;
export function curry<T1, T2, T3, R>(fn: (arg1: T1, arg2: T2, arg3: T3) => R): CurryFunction3<T1, T2, T3, R>;
export function curry<T1, T2, T3, T4, R>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R): CurryFunction4<T1, T2, T3, T4, R>;
export function curry<T1, T2, T3, T4, T5, R>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R): CurryFunction5<T1, T2, T3, T4, T5, R>;
export function curry<T1, T2, T3, T4, T5, T6, R>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => R): CurryFunction6<T1, T2, T3, T4, T5, T6, R>;
export function curry(fn: Function) {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...args2: any[]) => curried(...args, ...args2);
    }
  };
}
