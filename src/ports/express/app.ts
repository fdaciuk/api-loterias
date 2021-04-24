import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use('/api/v1', routes)

app.get('/', (_req, res) => {
  res.send(p('<a href="/api/v1/docs" >Documentação (v1)</a>'))
})

app.get('*', (_req, res) => {
  res.status(404).send(p('Não tem nada aqui :)<br />Voltar para a <a href="/">Home</a>'))
})

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}`)
})

function p (markup: string): string {
  return `<p style="color: #000; font-family: sans-serif;">${markup}</p>`
}
