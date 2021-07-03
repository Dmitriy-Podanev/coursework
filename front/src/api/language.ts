import { ApiService } from '../services/ApiService'
import { Language } from '../types/language'

export const apiLanguageGetAll = async (): Promise<Language.Data[]> => {
  const { data } = await ApiService(true).get<Language.Data[]>('/languages')
  return data
}

export const apiLanguageGetById = async (id: number): Promise<Language.Data> => {
  const { data } = await ApiService(true).get<Language.Data>(`/languages/${id}`)
  return data
}

export const apiLanguageCreate = async (params: Language.Create.Params): Promise<Language.Data> => {
  const { data } = await ApiService(true).post<Language.Data>('/languages', params)
  return data
}

export const apiLanguageUpdate = async (params: Language.Data): Promise<Language.Data> => {
  const { data } = await ApiService(true).put<Language.Data>('/languages', params)
  return data
}
