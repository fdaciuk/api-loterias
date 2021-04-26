import { pipe, identity } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import * as db from '@/ports/db-in-memory'
import { getLoteriasAdapter } from '@/adapters/loterias'
import { getConcursosAdpter, getConcursoAdapter } from '@/adapters/concursos'

type ConcursoInput = {
  id: string
}

export const resolvers = {
  Query: {
    async loterias () {
      const loterias = await getLoteriasAdapter(db.getLoterias)

      return pipe(
        loterias,
        fold(
          (reason) => { throw reason },
          identity,
        ),
      )
    },

    async concursos () {
      const concursos = await getConcursosAdpter(db.getConcursos)

      return pipe(
        concursos,
        fold(
          (reason) => { throw reason },
          identity,
        ),
      )
    },

    async concurso (_: unknown, { id }: ConcursoInput) {
      const concurso = await pipe(
        id,
        getConcursoAdapter,
        (a) => a(db.findOneConcurso),
        (b) => b(db.getLoteriaByName),
      )

      return pipe(
        concurso,
        fold(
          (reason) => { throw reason },
          (result) => result,
        ),
      )
    },
  },
}
