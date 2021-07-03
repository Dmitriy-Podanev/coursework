import block from 'bem-cn'
import React, { CSSProperties, useMemo } from 'react'
import { isNumber } from 'lodash'
import { BaseComponentProps } from '../../types/base'
import './Spinner.css'
import { SpinnerType } from './SpinnerType'

interface Props extends BaseComponentProps {
  size?: number | string;
  width?: number;
  type?: SpinnerType;
}

const b = block('spinner')

export const Spinner: React.FC<Props> = ({
  className = '',
  size = '1em',
  width = 2,
  type = SpinnerType.Primary
}) => {
  const style = useMemo<CSSProperties>(() => ({
    width: isNumber(size) ? `${size}px` : size,
    height: isNumber(size) ? `${size}px` : size,
    borderWidth: width
  }), [width, size])

  return (
    <span
      className={b({ [type]: true }).mix(className).toString()}
      style={style}
    />
  )
}
