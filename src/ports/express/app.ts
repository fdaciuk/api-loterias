import express from 'express'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'
import { routes } from './routes'
import swaggerConfig from './swagger-config'

const app = express()

app.use(cors())
app.use('/api/v1/docs', serve, setup(swaggerConfig))
app.use('/api/v1', routes)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}`)
})
