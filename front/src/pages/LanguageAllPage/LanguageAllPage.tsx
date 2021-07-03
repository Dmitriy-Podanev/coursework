import block from 'bem-cn'
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import { Spinner } from '../../components/Spinner/Spinner'
import { useLanguageGetAll } from '../../hooks/useLanguageGetAll'
import { BasePageProps } from '../../types/base'
import './LanguageAllPage.css'

interface Props extends BasePageProps {
}

const b = block('language-all-page')

export const LanguageAllPage: React.FC<Props> = () => {
  const { data, loading } = useLanguageGetAll()

  return (
    <Card title={'Языки'} className={b()}>
      <div className={b('content')}>
        {loading && (
          <Spinner size={32} />
        )}
        {data.length > 0 && !loading ? (
          <ul className={b('list')}>
            {data.map(item => (
              <li key={item.id}>
                <Link to={`/ref/languages/${item.id}`}>{item.name}</Link>
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
