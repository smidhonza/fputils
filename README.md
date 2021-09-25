# FP utils

A bunch of useful utility functions


## Examples

### Either

```typescript
import { either, Either, Right, Left } from 'fputils';

// define fetch function, this function does not throw, but returns Either data or error instead
const get = <T>(url: string): Either<Error, T> => new Promise(async resolve => {
    try {
        return resolve(Right(await fetch(url)))
    } catch (error) {
        return resolve(Left(error))
    }
});

// either usage
either((error) => {
    console.error({ error })
}, (result) => {
    console.log({ result })
}, await get<string[]>('https://api'));

```
