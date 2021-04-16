import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use('/api/v1', routes)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}`)
})
