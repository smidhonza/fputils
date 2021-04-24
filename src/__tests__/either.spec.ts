import { Left, Maybe, Right, whenRight } from '../either';
import { pipe } from '../pipe';

describe('when Right', () => {
  it('should not call the second function', () => {

    const addA = (input: string): Maybe<string> => Left(new Error('first error'));
    const addB = (input: string): Maybe<string> => Right(`${input}B`);




    expect(pipe(Right('a'), whenRight(addB))).toEqual(Right('aB'));
    expect(pipe('X', addA, whenRight(addB))).toEqual(Left(new Error('first error')));
  })
});
