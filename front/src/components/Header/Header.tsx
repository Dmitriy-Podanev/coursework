import block from 'bem-cn'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BaseComponentProps } from '../../types/base'
import './Header.css'
import { clearPhone, formatPhone } from '../../utils'

interface Props extends BaseComponentProps {
  phone?: string;
  right?: () => ReactNode
}

const b = block('header')

export const Header: React.FC<Props> = ({ className = '', right, phone }) => (
  <header className={b({}).mix(className)}>
    <Link
      className={b('title')}
      to={'/'}
    >
      Catalog
    </Link>
    {!!phone && (
      <a href={`tel:${clearPhone(phone)}`}>
        {formatPhone(phone)}
      </a>
    )}
    {!!right && right()}
  </header>
)
