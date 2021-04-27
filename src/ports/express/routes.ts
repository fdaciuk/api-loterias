import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import { Router } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfig from './swagger-config'
import * as db from '@/ports/db-in-memory'
import { getLoteriasAdapter } from '@/adapters/loterias'
import { getConcursosAdpter, getConcursoAdapter } from '@/adapters/concursos'

const routes = Router()

routes.use('/docs', serve, setup(swaggerConfig))

routes.get('/loterias', async (_req, res) => {
  const loterias = await getLoteriasAdapter(db.getLoterias)

  pipe(
    loterias,
    fold(
      (reason) => res.status(401).json({ error: true, message: reason }),
      (result) => res.json(result),
    ),
  )
})

routes.get('/loterias-concursos', async (_req, res) => {
  const concursos = await getConcursosAdpter(db.getConcursos)

  pipe(
    concursos,
    fold(
      (reason) => res.status(401).json({ error: true, message: reason }),
      (result) => res.json(result),
    ),
  )
})

routes.get('/concursos/:id', async (req, res) => {
  const { id = '' } = req.params

  const concurso = await pipe(
    id,
    getConcursoAdapter,
    (a) => a(db.findOneConcurso),
    (b) => b(db.getLoteriaByName),
  )

  pipe(
    concurso,
    fold(
      (reason) => res.status(404).json({ error: true, message: reason }),
      (result) => res.json(result),
    ),
  )
})

export { routes }
