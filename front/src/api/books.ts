import {Language} from "../types/language";
import {ApiService} from "../services/ApiService";

export const apiBooksGetAll = async (): Promise<any[]> => {
  const { data } = await ApiService(true).get<any[]>('/catalog')
  return data
}
