import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Loteria {
    id: ID
    nome: String
  }

  type Concurso {
    id: ID
    loteria: Int
    numeros: [String]
    data: String
  }

  type Query {
    loterias: [Loteria]
    concursos: [ID]
    concurso (id: ID!): Concurso
  }
`
