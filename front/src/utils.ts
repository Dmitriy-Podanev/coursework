export const emptyFunction = () => {}

export const checkAccessToken = (token: string): boolean => {
  return token !== ''
}

export const clearPhone = (value: string): string => {
  return value
    .replace(/[^+0-9]/g, '')
    .replace(/^8(\d{10})$/, '+7$1')
    .replace(/^(\d{10})$/, '+7$1')
}

/**
 * Возращает форматированный номер телефона
 *
 * @example
 * formatPhone('89001234567') => +7 (900) 123-45-67
 * formatPhone('+79001234567') => +7 (900) 123-45-67
 * formatPhone('9001234567') => +7 (900) 123-45-67
 * formatPhone('8-900-1234-567') => +7 (900) 123-45-67
 * formatPhone('+1-900-1234-567') => +1 (900) 123-45-67
 * formatPhone('1234567') => 123-45-67
 * formatPhone('123456') => 12-34-56
 *
 * @param {String} value Исходный номер телефона
 * @return {String} Форматированный номер телефона
 */
export const formatPhone = (value: string): string => {
  if (value === '') return ''

  const phone = clearPhone(value)

  if (phone === '') {
    throw new Error('Phone is not valid')
  }

  return phone
    .replace(/(\+\d+)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5')
    .replace(/^(\d{1,3})(\d{2})(\d{2})$/, '$1-$2-$3')
}
