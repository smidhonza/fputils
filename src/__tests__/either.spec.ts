import { Left, Maybe, Right, whenRight } from '../either';
import { pipe } from '../pipe';
import {compose} from "../compose";
import {prop} from "../prop";

describe('when Right', () => {
  it('should be ok', async () => {

    const isAuth = (is: boolean): Maybe<{ authToken: string }> =>is
      ? Right({ authToken: 'xxx' })
      : Left(new Error('Authentication Error'));

    const getProfile = (isTokenValid: boolean) => async (token: string): Promise<Maybe<{ username: string }>> => isTokenValid
      ? Right({ username: 'Pepa' })
      : Left(new Error('Invalid auth token'));

    const getUsername = async (isAuthenticated: boolean, isTokenValid: boolean) =>
      pipe(
        isAuth(isAuthenticated),
        whenRight(compose(await getProfile(isTokenValid), prop('authToken'))),
        whenRight((user) => user.username)
      )

    expect(await getUsername(false, false)).toEqual(Left(new Error('Authentication Error')));
    expect(await getUsername(true, false)).toEqual(Left(new Error('Invalid auth token')));
    expect(await getUsername(true, true)).toEqual('Pepa');
  })
});
