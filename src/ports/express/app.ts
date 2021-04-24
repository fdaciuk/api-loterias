import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use('/api/v1', routes)

app.get('/', (_req, res) => {
  res.send(center('<h1><a href="/api/v1/docs">Documentação (v1)</a></h1>'))
})

app.get('*', (_req, res) => {
  res.status(404).send(center(`
    <h1 style="margin: 0;">404</h1>
    <p>Não tem nada aqui :)<br />Voltar para a <a href="/">Home</a></p>
  `))
})

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}`)
})

function center (markup: string): string {
  return `
  <div style="color: #000; font-family: sans-serif; text-align: center; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
    ${markup}
  </div>
  `
}
