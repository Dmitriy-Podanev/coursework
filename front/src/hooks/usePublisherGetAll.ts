import { useEffect, useState } from 'react'
import { apiPublisherGetAll } from '../api/publisher'
import { Publisher } from '../types/publisher'

interface UsePublisherGetAll {
  data: Publisher.Data[],
  loading: boolean;
  setSearch: (search: string) => void;
}

export const usePublisherGetAll = (defaultSearch: string = ''): UsePublisherGetAll => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Publisher.Data[]>([])
  const [search, setSearch] = useState<string>(defaultSearch)

  useEffect(() => {
    const params: Publisher.All.Search = {}

    if (search) {
      params.search = search
    }

    setLoading(true)
    apiPublisherGetAll(params)
      .then(setData)
      .catch(err => {
        console.error(err)
        setData([])
      })
      .then(() => setLoading(false))

  }, [search])

  return {
    data,
    loading,
    setSearch
  }
}
