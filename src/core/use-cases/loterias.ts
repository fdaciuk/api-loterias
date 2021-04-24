import type { Either } from 'fp-ts/Either'
import type { Task } from 'fp-ts/Task'
import type { Loteria } from '@/core/types/loteria'
import { to } from '@/core/utils'

export type GetLoterias = (f: Task<Loteria[]>) => Promise<Either<Error, Loteria[]>>

export const getLoterias: GetLoterias = (findAllLoterias) => {
  return to(findAllLoterias())
}
