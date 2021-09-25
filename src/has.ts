import { curry } from './curry';

type IHas = {
  <T extends object>(property: keyof T): (object: T) => boolean;
  <T extends object>(property: keyof T, object: T): boolean;
}
export const has: IHas = curry((property, obj) => !!obj[property]);
