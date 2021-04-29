import { tryCatch } from 'fp-ts/TaskEither'
import type { Either } from 'fp-ts/Either'
import type { Task } from 'fp-ts/Task'
import type { Concurso, LoteriaConcurso } from '@/core/types/concurso'

export type GetConcursos<E = unknown> = (f: Task<LoteriaConcurso[]>) =>
  Promise<Either<E, LoteriaConcurso[]>>

export type FindOneConcurso = (id: string) => Promise<Concurso>

export type GetConcurso<E = unknown> = (id: string) =>
  (f: FindOneConcurso) =>
  Promise<Either<E, Concurso>>

export const getConcursos: GetConcursos = (findAllConcursos) => {
  return tryCatch(
    () => findAllConcursos(),
    (e) => e,
  )()
}

export const getConcurso: GetConcurso = (id) => (findOneConcurso) => {
  return tryCatch(
    () => findOneConcurso(id),
    (reason) => reason,
  )()
}
