import { useEffect, useState } from 'react'
import { apiLanguageGetById } from '../api/language'
import { Language } from '../types/language'

interface UseLanguageById {
  data: Language.Data | null;
  loading: boolean;
  setId: (id: number) => void
}

export const useLanguageById = (defaultId?: number): UseLanguageById => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Language.Data | null>(null)
  const [id, setId] = useState<number | undefined>(defaultId)

  useEffect(() => {
    if (id === undefined || isNaN(id)) return

    setData(null)
    setLoading(true)
    apiLanguageGetById(id)
      .then(setData)
      .catch(console.error)
      .then(() => setLoading(false))
  }, [id])

  return {
    data,
    loading,
    setId
  }
}
