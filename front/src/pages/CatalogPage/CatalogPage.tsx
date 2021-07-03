import block from 'bem-cn'
import React from 'react'
import { Card } from '../../components/Card/Card'
import { BasePageProps } from '../../types/base'
import './CatalogPage.css'
import {Spinner} from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";
import {useLanguageGetAll} from "../../hooks/useLanguageGetAll";
import {useBooksGetAll} from "../../hooks/useBooksGetAll";

interface Props extends BasePageProps {
}

interface User {
  id: number;
  name: string;
  age: number;
}

interface UserTest {
  id: number;
  email: string;
  num: number;
}

const users: User[] = [
  {
    id: 1,
    name: 'Name 1',
    age: 20
  },
  {
    id: 2,
    name: 'Name 2',
    age: 30
  }
]

const b = block('catalog-page')



export const CatalogPage: React.FC<Props> = ({ match }) => {
  const { data, loading } = useBooksGetAll()
  return (
    <div className={b()}>
      <Card title={'Каталог'}>

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
    </div>
  )
}
