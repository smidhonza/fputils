import { has } from './common';
import { prop } from './prop';
import { assoc } from './assoc';
import { curry } from './curry';

type IPartialReturn = {
  <V>(value: V): <O, T>(object: O) => T;
  <V, O, T>(value: V, object: O): T;
}

type IAssocPath = {
  (path: string[]): IPartialReturn;
  <T, V>(path: string[], value: V): <O>(object: O) => T;
  <T, V, O>(path: string[], value: V, object: O): T;
}
export const assocPath: IAssocPath = curry((path, value, obj) => {
  if (path.length === 0) {
    return value;
  }
  const [head, ...tail] = path;
  if (tail.length) {
    const nextObj = has(head, obj) ? prop(head, obj) : {};
    const nextValue = assocPath(tail, value, nextObj);
    return assoc(head, nextValue, obj);
  }
  return assoc(head, value, obj);
});
