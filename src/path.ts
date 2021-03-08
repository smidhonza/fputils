import { Optional } from './common';
import { head } from './array';

export const path = <T>(...bits: string[]) => (object: object): Optional<T> => {
  const [property, ...rest] = bits;
  if (object[property]) {
    if (head(rest)) {
      return path<T>(...rest)(object[property]);
    }
    return object[property];
  }
  return undefined;
};
