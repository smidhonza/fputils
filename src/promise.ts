import { isLeft, Left, Maybe, Right } from './either'

export type UntilResolved = {
  <A>(promises: Promise<A>[]): Promise<Maybe<A>>;
}

export const untilNotResolved: UntilResolved = async (arr) => {
  const [head, ...rest] = arr;
  if(head) {
    try {
      return Right(await head);
    } catch (e) {
      return untilNotResolved(rest)
    }
  }

  return Left(new Error('No promise resolved.'));
}

export type UntilRight = {
  <A>(promises: Promise<Maybe<A>>[]): Promise<Maybe<A>>; }

export const untilNotRight: UntilRight = async (arr) => {
  const [head, ...rest] = arr;
  if(head) {
    const r = await head;
    if(isLeft(r)) {
      return untilNotRight(rest);
    }

    return r;
  }

  return Left(new Error('No promise returned right.'));
}
