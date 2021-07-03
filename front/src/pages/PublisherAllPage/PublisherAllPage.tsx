import block from 'bem-cn'
import { debounce } from 'lodash'
import React, { ChangeEventHandler, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import { Input } from '../../components/Input/Input'
import { Spinner } from '../../components/Spinner/Spinner'
import { usePublisherGetAll } from '../../hooks/usePublisherGetAll'
import { BasePageProps } from '../../types/base'
import './PublisherAllPage.css'

interface Props extends BasePageProps {
}

const b = block('publisher-all-page')

export const PublisherAllPage: React.FC<Props> = () => {
  const { data, loading, setSearch } = usePublisherGetAll()

  const handlerChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    setSearch(event.target.value)
  }, [setSearch])

  const debounceHandlerChange = useCallback(debounce(handlerChange, 500), [handlerChange])

  return (
    <Card title={'Издательства'} className={b()}>
      <div className={b('content')}>
        <Input
          name={'search'}
          placeholder={'Поиск'}
          onChange={debounceHandlerChange}
        />
        {loading && (
          <Spinner size={32} />
        )}
        <h3>Результаты поиска:</h3>
        {data.length > 0 ? (
          <ul className={b('list')}>
            {data.map(item => (
              <li key={item.id}>
                <Link to={`/ref/publishers/${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </Card>
  )
}
