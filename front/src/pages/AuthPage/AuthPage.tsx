import block from 'bem-cn'
import React from 'react'
import { AuthForm } from '../../components/Forms/AuthForm/AuthForm'
import { BasePageProps } from '../../types/base'
import './AuthPage.css'

interface Props extends BasePageProps {
}

const b = block('auth-page')

export const AuthPage: React.FC<Props> = () => {
  return (
    <div className={b()}>
      <AuthForm className={b('form')} />
    </div>
  )
}
