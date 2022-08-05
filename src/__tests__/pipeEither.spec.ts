import {Either, Left, Right} from "../either";
import {pipeEither} from "../pipeEither";

describe('pipeEither', () => {
  const userError = new Error('getUser Error')
  const getUserRight = async (token: string): Promise<Either<Error, string>> => Right('pepa');
  const getUserLeft = async (token: string): Promise<Either<Error, string>> => Left(userError);

  const saveLeft = async (user: string): Promise<Either<boolean, string>> => Left(false)
  const saveRight = async (user: string): Promise<Either<boolean, string>> => Right(`user "${user}" saved`)

  const getLatestIdLeft = async (user: string): Promise<Either<undefined, number>> => Left(undefined)
  const getLatestIdRight = async (user: string): Promise<Either<undefined, number>> => Right(5)


  it('should return Right when no function passed', async () => {
    const result = await pipeEither('token')
    expect(result).toEqual(Right('token'))
  })

  describe('with 2 functions', () => {
    it('should return Left when first function call fails', async () => {
      const result = await pipeEither('token', getUserLeft, saveRight)
      expect(result).toEqual(Left(userError))
    })

    it('should return Left when second function call fails', async() => {
      const result = await pipeEither('token', getUserRight, saveLeft)
      expect(result).toEqual(Left(false))
    })

    it('should return Right when all goes right', async() => {
      const result = await pipeEither('token', getUserRight, saveRight)
      expect(result).toEqual(Right('user "pepa" saved'))
    })
  })

  describe('with 3 functions', () => {
    it('should return Left when third function call fails', async() => {
      const result = await pipeEither('token', getUserRight, saveRight, getLatestIdLeft)
      expect(result).toEqual(Left(undefined))
    })

    it('should return Right when all goes ok', async() => {
      const result = await pipeEither('token', getUserRight, saveRight, getLatestIdRight)
      expect(result).toEqual(Right(5))
    })
  })

})
