import { isLeft, isRight, tryCatch } from '../either';

describe('request', () => {
  describe('tryCatch', () => {
    it('returns a Left', async () => {
      const errorMessage = 'error message';
      const result = await tryCatch(async () => {
        throw new Error(errorMessage);
        return 1;
      });

      if (!isLeft(result)) {
        fail('is not left');
      }

      expect(result.value.message).toEqual(errorMessage);
    });

    it('returns Right', async () => {
      const okMessage = 'ok message';
      const result = await tryCatch(async () => 'ok message');

      expect(isRight(result)).toEqual(true);
      expect(result.value).toEqual(okMessage);
    });
  });
});
