import { AxiosError } from 'axios'
import { ApiService } from '../services/ApiService'
import { App } from '../types/app'
import { Auth } from '../types/auth'

export const apiAuthLogin = async (params: Auth.Login.Params): Promise<App.Token | never> => {
  try {
    const { data } = await ApiService().post<App.Token>('/auth/login', params)
    return data
  } catch (err) {
    const { response } = err as AxiosError<App.ResponseError>
    throw new Error(response?.data?.errors?.join(' ') || err.message)
  }
}

// export const apiAuthRefresh = async (params: Auth.Refresh.Params): Promise<App.Token> => {
//   const { data } = await ApiService().post<App.Token>('/api/v1/auth/refresh', params)
//   return data
// }

export const apiAuthLogout = async (): Promise<void> => {
  await ApiService(true).post<void>('/auth/logout')
}
