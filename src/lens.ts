import { curry } from './curry';
import { prop } from './prop';

const lens = get => set => ({ get, set });

export const view = curry((lens, obj) => lens.get(obj));

export const set = curry((lens, value, object) => lens.set(value)(object));

export const over = curry((lens, fn, obj) => set(lens)(fn(view(lens)(obj)))(obj));

export const assoc = curry((key, value, object) => ({ ...object, [key]: value }));

export const lensProp = (key: string) => lens(prop(key))(assoc(key));
