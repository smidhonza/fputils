import { curry } from './curry';
import { prop } from './prop';
import { ValueOf } from '../lib';

interface ILens<T> {
  get: (value: T) => ValueOf<T>;
  set: <V>(value: V) => void;
}
const lens = <T>(get: ILens<T>['get']) => (set: ILens<T>['set']): ILens<T> => ({ get, set });

type IView = {
  <T>(lens: ILens<T>): ILens<T>['get'];
  <T, L, R>(lens: ILens<T>, object: L): R;
}
export const view: IView = curry((lens, obj) => lens.get(obj));

type ISet = {
  <T, V, O>(lens: ILens<T>): (value: V) => (object: O) => T;
  <T, V, O>(lens: ILens<T>, value: V): (object: O) => T;
  <T, V, O>(lens: ILens<T>, value: V, object: O): T;
}
export const set: ISet = curry((lens, value, object) => lens.set(value)(object));

export const over = curry((lens, fn, obj) => set(lens)(fn(view(lens)(obj)))(obj));

export const assoc = curry((key, value, object) => ({ ...object, [key]: value }));

export const lensProp = <T>(key: keyof T): ILens<T> => lens(prop(key))(assoc(key));
