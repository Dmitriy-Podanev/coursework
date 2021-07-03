import block from 'bem-cn'
import React from 'react'
import { BasePageProps } from '../../types/base'
import './Error404.css'

interface Props extends BasePageProps {
}

const b = block('error404')

export const Error404: React.FC<Props> = () => {
  return (
    <div className={b()}>
      <h1 className={b('message')}>
        Ошибка 404, страница не найдена
      </h1>
    </div>
  )
}
