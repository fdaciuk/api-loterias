import { pipe, identity } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import { IResolvers } from 'graphql-tools'
import * as db from '@/ports/db-in-memory'
import { getLoteriasAdapter } from '@/adapters/loterias'
import { getConcursosAdpter, getConcursoAdapter } from '@/adapters/concursos'

type ConcursoInput = {
  id: string
}

export const resolvers: IResolvers = {
  Query: {
    async loterias () {
      const loterias = await getLoteriasAdapter(db.getLoterias)

      return pipe(
        loterias,
        fold(
          (reason) => { throw new Error(`${reason}`) },
          identity,
        ),
      )
    },

    async loteriasConcursos () {
      const concursos = await getConcursosAdpter(db.getConcursos)

      return pipe(
        concursos,
        fold(
          (reason) => { throw new Error(`${reason}`) },
          identity,
        ),
      )
    },

    async concurso (_, { id }: ConcursoInput) {
      const concurso = await pipe(
        id,
        getConcursoAdapter,
        (a) => a(db.findOneConcurso),
        (b) => b(db.getLoteriaByName),
      )

      return pipe(
        concurso,
        fold(
          (reason) => { throw new Error(`${reason}`) },
          (result) => result,
        ),
      )
    },
  },
}
