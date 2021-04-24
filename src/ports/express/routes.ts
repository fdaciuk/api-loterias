import { Router } from 'express'
import json from './data.json'
import { join } from 'path'

const app = Router()

const loterias = json.data.map((data, index) => ({
  id: index,
  nome: data.loteria,
}))

const concursos = json.data.map((data) => data.concurso)

function getRandomDate (): string {
  const date = new Date()
  const rand = Math.ceil(Math.random() * 5)

  date.setDate(date.getDate() - rand)
  return date.toISOString()
}

app.get('/', (_req, res) => {
  res.sendFile(join(process.cwd(), 'README.md'), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
})

app.get('/loterias', (_req, res) => {
  res.json(loterias)
})

app.get('/concursos', (_req, res) => {
  res.json(concursos)
})

app.get('/concursos/:id', (req, res) => {
  const { id } = req.params
  const concurso = json.data.find(data => data.concurso === id)

  if (!concurso) {
    res.status(404).json({ error: true, message: 'Concurso não encontrado.' })
    return
  }

  const response = {
    id: concurso.concurso,
    loteria: loterias.find(l => l.nome === concurso.loteria)?.id,
    numeros: concurso.numeros,
    data: getRandomDate(),
  }

  res.json(response)
})

app.get('*', (_req, res) => {
  res.redirect('/')
})

export { app as routes }
