import { ApiService } from '../services/ApiService'
import { Publisher } from '../types/publisher'

export const apiPublisherGetAll = async (params: Publisher.All.Search): Promise<Publisher.Data[]> => {
  const { data } = await ApiService(true).get<Publisher.Data[]>('/publishers', { params })
  return data
}
