import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export async function startApolloServer (): Promise<ApolloServer> {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
  })

  await server.start()
  return server
}
