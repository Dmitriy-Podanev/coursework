import block from 'bem-cn'
import { nanoid } from 'nanoid'
import React, { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, useEffect, useMemo, useState } from 'react'
import { BaseComponentProps } from '../../types/base'
import { emptyFunction } from '../../utils'
import './Input.css'
import { InputType } from './InputType'

interface Props extends BaseComponentProps {
  label?: string;
  defaultValue?: string;
  value?: string;
  name: string;
  htmlType?: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

const b = block('input')

export const Input = React.forwardRef<HTMLInputElement, Props>(({
  className = '',
  label = '',
  value = '',
  defaultValue = '',
  htmlType = InputType.Text,
  name,
  onChange = emptyFunction,
  onFocus = emptyFunction,
  onBlur = emptyFunction,
  onKeyDown = emptyFunction,
  onPressEnter = emptyFunction,
  error = '',
  placeholder = '',
  disabled = false
}, ref) => {
  const [currentFocus, setCurrentFocus] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState<string>(defaultValue)

  const id = useMemo<string>(() => nanoid(7), [])

  const handlerChange: ChangeEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    setCurrentValue(event.target.value)
    onChange(event)
  }

  const handlerFocus: FocusEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    setCurrentFocus(true)
    onFocus(event)
  }

  const handlerBlur: FocusEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    setCurrentFocus(false)
    onBlur(event)
  }

  const handlerKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (['Enter', 'NumpadEnter'].includes(event.code)) {
      onPressEnter(event)
    }
    onKeyDown(event)
  }

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <div className={b({}).mix(className)}>
      <div className={b('container', { 'has-label': !!label, active: currentFocus })}>
        {!!label && (
          <label
            className={b('label', { active: currentFocus || !!currentValue })}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={b('input', { error: !!error })}
          value={currentValue}
          onChange={handlerChange}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          onKeyDown={handlerKeyDown}
          type={htmlType}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {!!error && (
        <p className={b('error')}>
          {error}
        </p>
      )}
    </div>
  )
})
