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

routes.get('/concursos', async (_req, res) => {
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
  try {
    const concurso = await getConcursoAdapter(id)(db.findOneConcurso)(db.getLoteriaByName)

    pipe(
      concurso,
      fold(
        (reason) => res.status(404).json({ error: true, message: reason }),
        (result) => res.json(result),
      ),
    )
  } catch (e) {
    console.log(e)
    res.json({ error: true, message: e.message })
  }
})

export { routes }
