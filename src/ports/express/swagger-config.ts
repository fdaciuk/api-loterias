import swaggerJsDoc, { Options } from 'swagger-jsdoc'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '0.1.0',
      title: 'API Loterias',
      description: 'API para desafio de frontend da Brainn Co.',
    },

    servers: [
      {
        url: 'https://brainn-api-loterias.herokuapp.com/api/v1',
        description: 'Production server',
      },

      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local server',
      },
    ],

    paths: {
      '/loterias': {
        get: {
          tags: ['Loterias'],
          summary: 'Informações de loterias',
          description: 'Esse endpoint retorna todos os dados das loterias',
          operationId: 'getLoterias',
          responses: {
            200: {
              description: 'Loterias foram retornadas',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#components/schemas/Loterias',
                  },
                },
              },
            },
          },
        },
      },

      '/concursos': {
        get: {
          tags: ['Concursos'],
          summary: 'IDs dos concursos',
          description: 'Esse endpoint retorna todos os IDs dos concursos',
          operationId: 'getConcursos',
          responses: {
            200: {
              description: 'IDs dos concursos foram retornados',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#components/schemas/Concursos',
                  },
                },
              },
            },
          },
        },
      },

      '/concursos/{id}': {
        get: {
          tags: ['Concursos'],
          summary: 'Dados do concurso',
          description: 'Esse endpoint retorna todos os dados de um concurso',
          operationId: 'getConcurso',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID do concurso',
              example: '430',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Um concurso foi retornado',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#components/schemas/Concurso',
                  },
                },
              },
            },

            404: {
              description: 'Concurso não encontrado',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#components/schemas/ConcursoError',
                  },
                },
              },
            },
          },
        },
      },
    },

    components: {
      schemas: {
        Loterias: {
          type: 'array',
          items: {
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },

              nome: {
                type: 'string',
                example: 'Mega Sena',
              },
            },
          },
        },

        Concursos: {
          type: 'array',
          items: {
            type: 'string',
            example: '430',
          },
        },

        Concurso: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '430',
            },

            loteria: {
              type: 'integer',
              example: 1,
            },

            numeros: {
              type: 'array',
              items: {
                type: 'string',
                example: '10',
              },
            },

            data: {
              type: 'string',
              format: 'date-time',
              example: '2021-04-20T00:28:09.426Z',
            },
          },
        },

        ConcursoError: {
          type: 'object',
          properties: {
            error: {
              type: 'boolean',
              example: true,
            },

            message: {
              type: 'string',
              example: 'Concurso não encontrado.',
            },
          },
        },
      },
    },
  },

  apis: [],
}

export default swaggerJsDoc(options)
