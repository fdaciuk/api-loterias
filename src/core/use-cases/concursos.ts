import type { Either } from 'fp-ts/Either'
import type { Task } from 'fp-ts/Task'
import type { Concurso } from '@/core/types/concurso'
import { to } from '@/core/utils'

export type GetConcursos = (f: Task<string[]>) => Promise<Either<Error, string[]>>

export type FindOneConcurso = (id: string) => Promise<Concurso>
export type GetConcurso = (id: string) => (f: FindOneConcurso) => Promise<Either<Error, Concurso>>

export const getConcursos: GetConcursos = (findAllConcursos) => {
  return to(findAllConcursos())
}

export const getConcurso: GetConcurso = (id) => async (findOneConcurso) => {
  return to(findOneConcurso(id))
}
