import block from 'bem-cn'
import React from 'react'
import { BaseComponentProps } from '../../types/base'
import './Card.css'

interface Props extends BaseComponentProps {
  title: string;
  rightElement?: () => React.ReactNode;
}

const b = block('card')

export const Card: React.FC<Props> = ({ className = '', title, rightElement, children }) => {
  return (
    <section className={b({}).mix(className)}>
      <header className={b('header')}>
        <h2 className={b('title')}>{title}</h2>
        {!!rightElement && rightElement()}
      </header>
      <div className={b('content')}>
        {children}
      </div>
    </section>
  )
}
