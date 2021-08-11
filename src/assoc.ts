import { curry } from './curry';

type IPartialReturn<K extends string> = {
  <V>(value: V): <O>(object: O) => O & {[key in K]: V};
  <V, O>(value: V, object: O): O & {[key in K]: V};
}

type IAssoc = {
  <K extends string>(key: K): IPartialReturn<K>;
  <K extends string, V>(key: K, value: V): <O>(object: O) => O & {[key in K]: V};
  <K extends string, V, O>(key: K, value: V, object: O): O & {[key in K]: V};
}
export const assoc: IAssoc = curry((key, value, object) => ({ ...object, [key]: value }));
