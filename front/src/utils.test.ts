import { formatPhone } from './utils'

describe('utils', () => {
  describe('formatPhone', () => {
    it('89001234567 => +7 (900) 123-45-67', () => {
      expect(formatPhone('89001234567')).toBe('+7 (900) 123-45-67')
    })

    it('+79001234567 => +7 (900) 123-45-67', () => {
      expect(formatPhone('+79001234567')).toBe('+7 (900) 123-45-67')
    })

    it('9001234567 => +7 (900) 123-45-67', () => {
      expect(formatPhone('9001234567')).toBe('+7 (900) 123-45-67')
    })

    it('+1-900-1234-567 => +1 (900) 123-45-67', () => {
      expect(formatPhone('+1-900-1234-567')).toBe('+1 (900) 123-45-67')
    })

    it('1234567 => 123-45-67', () => {
      expect(formatPhone('1234567')).toBe('123-45-67')
    })

    it('123456 => 12-34-56', () => {
      expect(formatPhone('123456')).toBe('12-34-56')
    })

    it('string => Error', () => {
      expect(() => {formatPhone('string')}).toThrow()
    })

    it('"" => ""', () => {
      expect(formatPhone('')).toBe('')
    })
  })
})
