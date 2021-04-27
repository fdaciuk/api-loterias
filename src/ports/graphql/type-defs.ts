import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Loteria {
    id: Int
    nome: String
  }

  type Concurso {
    id: ID
    loteria: Int
    numeros: [String]
    data: String
  }

  type LoteriaConcurso {
    loteriaId: Int
    concursoId: ID
  }

  type Query {
    loterias: [Loteria]
    loteriasConcursos: [LoteriaConcurso]
    concurso (id: ID!): Concurso
  }
`
