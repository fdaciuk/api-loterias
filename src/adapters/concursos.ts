import { pipe } from 'fp-ts/function'
import { Either, isLeft, right } from 'fp-ts/Either'
import type { Loteria } from '@/core/types/loteria'
import * as usecaseConcursos from '@/core/use-cases/concursos'
import { to } from '@/core/utils'

type ConcursoNormalized = {
  id: string
  loteria: number
  numeros: string[]
  data: string
}

type GetLoteriaByName = (loteria: string) => Promise<Loteria>

type GetConcursoAdapter = (id: string) =>
  (f: usecaseConcursos.FindOneConcurso) =>
  (f2: GetLoteriaByName) =>
  Promise<Either<Error, ConcursoNormalized>>

export const getConcursosAdpter: usecaseConcursos.GetConcursos = (findAllConcursos) => {
  return usecaseConcursos.getConcursos(findAllConcursos)
}

export const getConcursoAdapter: GetConcursoAdapter = (id) => (findOneConcurso) => async (getLoteriaByName) => {
  const result = await pipe(
    findOneConcurso,
    usecaseConcursos.getConcurso(id),
  )

  if (isLeft(result)) {
    return result
  }

  const concurso = result.right
  const loteria = await to(getLoteriaByName(concurso.loteria))

  if (isLeft(loteria)) {
    return loteria
  }

  return right({
    id: concurso.concurso,
    loteria: loteria.right.id,
    numeros: concurso.numeros,
    data: getRandomDate(),
  })
}

function getRandomDate (): string {
  const date = new Date()
  const rand = Math.ceil(Math.random() * 5)

  date.setDate(date.getDate() - rand)
  return date.toISOString()
}
