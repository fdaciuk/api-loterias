import { getLoterias } from './loterias'
import { right, left } from 'fp-ts/Either'
import type { Loteria } from '@/core/types/loteria'

const data = [
  {
    id: 1,
    nome: 'mega sena',
  },

  {
    id: 2,
    nome: 'quina',
  },
]

async function findAllLoterias (): Promise<Loteria[]> {
  return data
}

async function hasNoLoterias (): Promise<never> {
  throw new Error('Nenhuma loteria encontrada')
}

describe('Use cases: Loterias', () => {
  it('Should return an array of Loterias (Right - Either)', async () => {
    const loterias = await getLoterias(findAllLoterias)
    expect(loterias).toEqual(right(data))
  })

  it('Should return a Left (Either) when does not have Loterias registered', async () => {
    const loterias = await getLoterias(hasNoLoterias)
    expect(loterias).toEqual(left('Nenhuma loteria encontrada'))
  })
})
