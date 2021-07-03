import axios, { AxiosInstance } from 'axios'
import { store } from '../store'
import { RootState } from '../store/types'

export const ApiService = (secured: boolean = false, getState: () => RootState.State = store.getState): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if (secured) {
    const state = getState()
    const accessToken = state.app.accessToken

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }
  }

  return axios.create({
    baseURL: '/api/v1',
    headers,
  })
}
