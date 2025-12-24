import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PokemonCard } from './PokemonCard'
import { Pokemon } from '@types/pokemon'

const mockPokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  image: 'https://example.com/pikachu.png',
  types: ['electric'],
  stats: [
    { name: 'hp', value: 35 },
    { name: 'attack', value: 55 },
  ],
  height: 4,
  weight: 60,
  abilities: ['static', 'lightning-rod'],
}

describe('PokemonCard', () => {
  it('should render pokemon name', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={() => {}} />)
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
  })

  it('should render pokemon id', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={() => {}} />)
    expect(screen.getByText('#025')).toBeInTheDocument()
  })

  it('should render pokemon type', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={() => {}} />)
    expect(screen.getByText('Elétrico')).toBeInTheDocument()
  })

  it('should render pokemon image', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={() => {}} />)
    const img = screen.getByAltText('pikachu')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', mockPokemon.image)
  })

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<PokemonCard pokemon={mockPokemon} onClick={handleClick} />)
    
    const card = screen.getByRole('button')
    fireEvent.click(card)
    
    expect(handleClick).toHaveBeenCalledWith(mockPokemon)
  })

  it('should call onClick when Enter key is pressed', () => {
    const handleClick = vi.fn()
    render(<PokemonCard pokemon={mockPokemon} onClick={handleClick} />)
    
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter' })
    
    expect(handleClick).toHaveBeenCalledWith(mockPokemon)
  })
})

