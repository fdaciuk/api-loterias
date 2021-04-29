import { tryCatch } from 'fp-ts/TaskEither'
import { identity } from 'fp-ts/function'
import type { Either } from 'fp-ts/Either'
import type { Task } from 'fp-ts/Task'
import type { Loteria } from '@/core/types/loteria'

export type GetLoterias<E = unknown> = (f: Task<Loteria[]>) =>
  Promise<Either<E, Loteria[]>>

export const getLoterias: GetLoterias = (findAllLoterias) => {
  return tryCatch(
    () => findAllLoterias(),
    identity,
  )()
}
