import { useEffect, useState } from 'react'
import { apiLanguageGetAll } from '../api/language'
import { Language } from '../types/language'

interface UseLanguageGetAll {
  data: Language.Data[],
  loading: boolean;
}

export const useLanguageGetAll = (): UseLanguageGetAll => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Language.Data[]>([])

  useEffect(() => {
    setLoading(true)
    apiLanguageGetAll()
      .then(setData)
      .catch(console.error)
      .then(() => setLoading(false))

  }, [])

  return {
    data,
    loading
  }
}
