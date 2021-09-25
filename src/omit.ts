import { curry } from './curry';
import { assoc } from './assoc';

export type Omit = {
  <T>(properties: string[], obj: T): T[];
  <T>(properties: string[]): (obj: T) => T[];
}

export const omit: Omit = curry((properties, obj) => Object.entries(obj).reduce((all, [key, value]) => (properties.includes(key) ? all : assoc(key, value, all)), {}));
