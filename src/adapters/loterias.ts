import * as usecaseLoterias from '@/core/use-cases/loterias'

export const getLoteriasAdapter: usecaseLoterias.GetLoterias = async (findAllLoterias) => {
  return usecaseLoterias.getLoterias(findAllLoterias)
}
