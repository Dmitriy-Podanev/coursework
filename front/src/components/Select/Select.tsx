import block from 'bem-cn'
import React from 'react'
import { BaseComponentProps } from '../../types/base'
import './Select.css'

interface Props<T> extends BaseComponentProps {
  data: T[],
  renderValue: (item: T) => string;
  renderLabel: (item: T) => React.ReactNode;
}

const b = block('select')

export class Select<T> extends React.Component<Props<T>> {
  static defaultProps = {
    className: ''
  }

  render () {
    const { className, data, renderLabel, renderValue } = this.props
    debugger

    return (
      <select className={b({}).mix(className)}>
        {data.map((item, index) => (
          <option
            key={index}
            value={renderValue(item)}
          >
            {renderLabel(item)}
          </option>
        ))}
      </select>
    )
  }
}
