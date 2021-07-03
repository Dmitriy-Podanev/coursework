import block from 'bem-cn'
import React, { MouseEventHandler, useMemo } from 'react'
import { BaseComponentProps } from '../../types/base'
import { emptyFunction } from '../../utils'
import { Spinner } from '../Spinner/Spinner'
import { SpinnerType } from '../Spinner/SpinnerType'
import './Button.css'
import { ButtonType } from './ButtonType'

interface Props extends BaseComponentProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
  type?: ButtonType;
  loading?: boolean;
}

const b = block('button')

export const Button: React.FC<Props> = ({
  className = '',
  children,
  onClick = emptyFunction,
  disabled = false,
  htmlType = 'button',
  type = ButtonType.Default,
  loading = false
}) => {
  const spinnerType = useMemo<SpinnerType>(() => {
    switch (type) {
      case ButtonType.Primary:
        return SpinnerType.Secondary
      default:
        return SpinnerType.Primary
    }
  }, [type])

  const visibleSpinner = useMemo<boolean>(() => loading && type !== ButtonType.Link, [type, loading])

  return (
    <button
      className={b({ [type]: true }).mix(className)}
      onClick={onClick}
      disabled={disabled || loading}
      type={htmlType}
    >
      {visibleSpinner && (
        <Spinner
          className={b('spinner')}
          type={spinnerType}
          size={24}
        />
      )}
      <span className={b('children')}>
        {children}
      </span>
    </button>
  )
}
