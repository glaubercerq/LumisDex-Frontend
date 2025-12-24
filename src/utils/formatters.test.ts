import { describe, it, expect } from 'vitest'
import { 
  formatPokemonId, 
  formatPokemonName, 
  formatHeight, 
  formatWeight 
} from './formatters'

describe('formatPokemonId', () => {
  it('should format single digit id with leading zeros', () => {
    expect(formatPokemonId(1)).toBe('#001')
  })

  it('should format double digit id with leading zero', () => {
    expect(formatPokemonId(25)).toBe('#025')
  })

  it('should format triple digit id without leading zeros', () => {
    expect(formatPokemonId(150)).toBe('#150')
  })

  it('should handle large ids', () => {
    expect(formatPokemonId(1000)).toBe('#1000')
  })
})

describe('formatPokemonName', () => {
  it('should capitalize single word name', () => {
    expect(formatPokemonName('pikachu')).toBe('Pikachu')
  })

  it('should format hyphenated names', () => {
    expect(formatPokemonName('mr-mime')).toBe('Mr Mime')
  })

  it('should handle multiple hyphens', () => {
    expect(formatPokemonName('tapu-koko')).toBe('Tapu Koko')
  })
})

describe('formatHeight', () => {
  it('should convert decimeters to meters', () => {
    expect(formatHeight(10)).toBe('1.0 m')
  })

  it('should handle small heights', () => {
    expect(formatHeight(4)).toBe('0.4 m')
  })

  it('should handle large heights', () => {
    expect(formatHeight(145)).toBe('14.5 m')
  })
})

describe('formatWeight', () => {
  it('should convert hectograms to kilograms', () => {
    expect(formatWeight(100)).toBe('10.0 kg')
  })

  it('should handle small weights', () => {
    expect(formatWeight(60)).toBe('6.0 kg')
  })

  it('should handle large weights', () => {
    expect(formatWeight(9999)).toBe('999.9 kg')
  })
})

