import { Either, right, left } from 'fp-ts/Either'

export async function to<T> (promise: Promise<T>): Promise<Either<Error, T>> {
  try {
    const result = await promise
    return right(result)
  } catch (error) {
    return left(error.message)
  }
}
