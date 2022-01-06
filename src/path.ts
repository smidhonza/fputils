import {alwaysTrue, bool, not, Optional} from './common';
import { head } from './array';
import { curry } from './curry';
import { prop } from './prop';
import { has } from './has';
import {cond} from "./cond";
import {compose} from "./compose";
import {pipe} from "./pipe";

type IPath = {
  <T>(bits: string[]): (object: object) => Optional<T>;
  <T>(bits: string[], object: object): Optional<T>;
}

export const path: IPath = curry((bits, object ) => {
  const [property, ...rest] = bits;
  return cond([
    [compose(not, has(property)), () => undefined],
    [() => pipe(rest, head, bool), compose(path(rest), prop(property))],
    [alwaysTrue, prop(property)]], object)
});
