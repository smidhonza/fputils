import { has, Optional } from './common';
import { head } from './array';
import { curry } from './curry';
import { prop } from './prop';

type IPath = {
  <T>(bits: string[]): (object: object) => Optional<T>;
  <T>(bits: string[], object: object): Optional<T>;
}
export const path: IPath = curry((bits, object) => {
  const [property, ...rest] = bits;
  if (!has(property, object)) {
    return undefined;
  }
  if (head(rest)) {
    return path(rest, prop(property, object));
  }
  return prop(property, object);
});
