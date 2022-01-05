import { curry } from '../curry';
import { prop } from '../prop';
import {path, StringKeyObject} from '../path';
import { Optional, ValueOf } from '../common';
import { assoc } from '../assoc';
import { assocPath } from '../assocPath';

interface ILens<T> {
  get: (value: T) => ValueOf<T>;
  set: <V>(value: V) => void;
}

type ILensFn = {
  <T>(get: ILens<T>['get'], set: ILens<T>['set']): ILens<T>;
  <T>(get: ILens<T>['get']): (set: ILens<T>['set']) => ILens<T>;
}
const lens: ILensFn = curry((get, set) => ({ get, set }));

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

export const lensProp = (key: string) => lens(prop(key), assoc(key));

type IPathFC = {
  <T>(bits: string[]): (object: StringKeyObject) => Optional<T>
  <T>(bits: string[], object: StringKeyObject): Optional<T>
}
export const pathFc: IPathFC = curry((bits: string[], object: StringKeyObject) => path(bits, object));

export const lensPath = (key: string[]) => lens(pathFc(key))(assocPath(key));

