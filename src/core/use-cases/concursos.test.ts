import { getConcursos, getConcurso } from './concursos'
import { right, left } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import type { Concurso, LoteriaConcurso } from '@/core/types/concurso'

const concursos: Concurso[] = [
  {
    loteria: 'dia de sorte',
    concurso: '440',
    diaDaSemana: 'terça',
    data: '06/04/21',
    numeros: ['02', '08', '13', '14', '17', '21', '24'],
  },

  {
    loteria: 'mega sena',
    concurso: '2359',
    diaDaSemana: 'terça',
    data: '06/04/21',
    numeros: ['31', '32', '39', '42', '43', '51'],
  },
]

const loteriasConcursos = [
  {
    loteriaId: 0,
    concursoId: '440',
  },

  {
    loteriaId: 1,
    concursoId: '2359',
  },
]

async function findAllConcursos (): Promise<LoteriaConcurso[]> {
  return loteriasConcursos
}

async function hasNoConcurso (): Promise<never> {
  throw new Error('Nenhum concurso encontrado')
}

async function findOneConcurso (id: string) {
  const concurso = concursos.find(c => c.concurso === id)

  if (!concurso) {
    throw new Error('Concurso não encontrado')
  }

  return concurso
}

describe('Use cases: Concursos', () => {
  it('Should return an array of Loterias and Concursos IDs (Right - Either)', async () => {
    const concursos = await getConcursos(findAllConcursos)
    expect(concursos).toEqual(right(loteriasConcursos))
  })

  it('Should return a Left (Either) when does not have Concursos registered', async () => {
    const concursos = await getConcursos(hasNoConcurso)
    expect(concursos).toEqual(left('Nenhum concurso encontrado'))
  })

  it('Should return a Concurso (Right - Either)', async () => {
    const concurso = await pipe(
      findOneConcurso,
      getConcurso('440'),
    )

    expect(concurso).toEqual(right(concursos.find(c => c.concurso === '440')))
  })

  it('Should return a Left (Either) when Concurso is not found', async () => {
    const concurso = await pipe(
      findOneConcurso,
      getConcurso('1'),
    )

    expect(concurso).toEqual(left('Concurso não encontrado'))
  })
})
