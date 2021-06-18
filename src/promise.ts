import { Left, Maybe, Right } from './either'

export type UntilResolved = {
  (promises: []): Promise<Maybe<Error>>;
  <A>(promises: [Promise<A>]): Promise<Maybe<A>>;
  <A, B>(promises: [Promise<A>, Promise<B>]): Promise<Maybe<A | B>>;
  <A, B, C>(promises: [Promise<A>, Promise<B>, Promise<C>]): Promise<Maybe<A | B | C>>;
  <A, B, C, D>(promises: [Promise<A>, Promise<B>, Promise<C>, Promise<D>]): Promise<Maybe<A | B | C | D>>;
  <A, B, C, D, E>(promises: [Promise<A>, Promise<B>, Promise<C>, Promise<D>, Promise<E>]): Promise<Maybe<A | B | C | D | E>>;
  <A, B, C, D, E, F>(promises: [Promise<A>, Promise<B>, Promise<C>, Promise<D>, Promise<E>, Promise<F>]): Promise<Maybe<A | B | C | D | E | F>>;
  <A, B, C, D, E, F, G>(promises: [Promise<A>, Promise<B>, Promise<C>, Promise<D>, Promise<E>, Promise<F>]): Promise<Maybe<A | B | C | D | E | F | G>>;
  <A, B, C, D, E, F, G, H>(promises: [Promise<A>, Promise<B>, Promise<C>, Promise<D>, Promise<E>, Promise<F>, Promise<G>, Promise<H>]): Promise<Maybe<A | B | C | D | E | F | G | H>>;
  <A, B, C, D, E, F, G, H, I>(promises: [Promise<A>, Promise<B>, Promise<C>, Promise<D>, Promise<E>, Promise<F>, Promise<G>, Promise<H>, Promise<I>]): Promise<Maybe<A | B | C | D | E | F | G | H | I>>;
}

export const untilResolved: UntilResolved = async (arr) => {
  const [head, ...rest] = arr;
  if(head) {
    try {
      return Right(await head);
    } catch (e) {
      return untilResolved(rest)
    }
  }

  return Left(new Error('No promise resolved.'));
}
