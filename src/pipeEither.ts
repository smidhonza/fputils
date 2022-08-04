import { Maybe, Right, isLeft, IRight, Either, ILeft } from './';

const getUser = async (id: string): Promise<Maybe<string>> => {
  return Right('Pavel');
};

const save = async (username: string): Promise<Maybe<boolean>> => {
  return Right(true);
};

async function pipe<T, L1, R1, L2, R2>(input: T, f1: (input: T) => Promise<Either<L1, R1>>, f2: (input: R1) => Promise<Either<L2, R2>>): Promise<Either<L2, R2> | ILeft<L1>>;
async function pipe<T, L, R>(input: T, f1: (input: T) => Promise<Either<L, R>>): Promise<Either<L, R>>;
async function pipe(input: any, ...functions: Array<(input: unknown) => Promise<Either<unknown, unknown>>>): Promise<any> {
  if (functions.length == 0) return Right(input);

  const [head, ...tail] = functions;
  if (!head) return Right(input);
  if (!tail) return Right(input);

  const res = await head(input);
  if (isLeft(res)) return res;

  return pipe(res.value, ...(tail as [any]));
}

const x = pipe('123', getUser, save);
