enum tag {
  'right' = 'right',
  'left' = 'left',
}

export interface ILeft<A> {
  value: A;
  tag: tag.left;
}

export interface IRight<B> {
  value: B;
  tag: tag.right;
}

export type Either<A, B> = ILeft<A> | IRight<B>;
export type Maybe<T> = Either<Error, T>;

export const Left = <A>(val: A): ILeft<A> => ({ value: val, tag: tag.left });
export const Right = <B>(val: B): IRight<B> => ({ value: val, tag: tag.right });
export const isLeft = <A, B>(val: Either<A, B>): val is ILeft<A> => (val as ILeft<A>).tag === tag.left;
export const isRight = <A, B>(val: Either<A, B>): val is IRight<B> => (val as IRight<B>).tag === tag.right;

export const either = <L, R, A, B>(leftFn: (left: L) => A, rightFn: (right: R) => B, value: Either<L, R>): A | B => {
  if (isLeft(value)) {
    return leftFn(value.value);
  }

  return rightFn(value.value);
};

export const whenRight = <V, L, R>(f: (value: R) => Either<L,  R>) => (maybe: Either<L, R>) => {
  if(isLeft(maybe)) {
    return maybe;
  }
  return f(maybe.value)
};

export const tryCatch = async <T>(fn: () => Promise<T>): Promise<Maybe<T>> => {
  try {
    return Right(await fn());
  } catch (error) {
    return Left(error);
  }
};
