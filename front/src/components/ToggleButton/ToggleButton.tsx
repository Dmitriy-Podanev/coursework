import block from 'bem-cn'
import React, { useState } from 'react'
import './ToggleButton.css'

interface Props {}

const b = block('toggle-button')

export const ToggleButton: React.FC<Props> = () => {
  const [active, setState] = useState<boolean>(false)

  return (
    <button
      className={b({ active })}
      onClick={() => setState(!active)}
    />
  )
}
