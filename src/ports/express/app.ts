import express from 'express'
import cors from 'cors'
import { startApolloServer } from '@/ports/graphql'
import { routes } from './routes'
import { center } from './utils'

const app = express()

app.use(cors())
app.use('/api/v1', routes)

app.get('/', (_req, res) => {
  res.send(center(
    `
    <h1><a href="/api/v1/docs">Documentação (v1)</a></h1>
    <h1><a href="/graphql">Documentação GraphQL</a></h1>
    `,
  ))
})

async function start () {
  const server = await startApolloServer()

  server.applyMiddleware({ app, path: '/graphql' })

  app.get('*', (_req, res) => {
    res.status(404).send(center(`
      <h1 style="margin: 0;">404</h1>
      <p>Não tem nada aqui :)<br />Voltar para a <a href="/">Home</a></p>
    `))
  })

  const { PORT } = process.env
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
    console.log(`🚀 GraphQL server available at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

start()
