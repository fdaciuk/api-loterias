import { pipe, identity } from 'fp-ts/function'
import { ap } from 'fp-ts/Identity'
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
        fold(identity, identity),
      )
    },

    async loteriasConcursos () {
      const concursos = await getConcursosAdpter(db.getConcursos)

      return pipe(
        concursos,
        fold(identity, identity),
      )
    },

    async concurso (_, { id }: ConcursoInput) {
      const concurso = await pipe(
        id,
        getConcursoAdapter,
        ap(db.findOneConcurso),
        ap(db.getLoteriaByName),
      )

      return pipe(
        concurso,
        fold(identity, identity),
      )
    },
  },
}
