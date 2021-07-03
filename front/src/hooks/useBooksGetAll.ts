import { useEffect, useState } from 'react'
import { apiBooksGetAll } from '../api/books'
import { apiLanguageGetAll } from '../api/language'
import { Language } from '../types/language'

interface UseLanguageGetAll {
  data: any[],
  loading: boolean;
}

export const useBooksGetAll = (): UseLanguageGetAll => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    apiBooksGetAll()
      .then(setData)
      .catch(console.error)
      .then(() => setLoading(false))

  }, [])

  return {
    data,
    loading
  }
}
