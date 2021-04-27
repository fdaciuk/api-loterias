import json from './data.json'

const loterias = json.data.map((data, index) => ({
  id: index,
  nome: data.loteria,
}))

const loteriasConcursos = json.data.map((data) => {
  const loteriaId = loterias.find(l => l.nome === data.loteria)!.id

  return {
    loteriaId,
    concursoId: data.concurso,
  }
})

export async function getLoterias () {
  return loterias
}

export async function getLoteriaByName (loteriaName: string) {
  const loteria = loterias.find(l => l.nome === loteriaName)

  if (!loteria) {
    throw new Error('Loteria não encontrada')
  }

  return loteria
}

export async function getConcursos () {
  return loteriasConcursos
}

export async function findOneConcurso (id: string) {
  const concurso = json.data.find(data => data.concurso === id)

  if (!concurso) {
    throw new Error('Concurso não encontrado')
  }

  return concurso
}
