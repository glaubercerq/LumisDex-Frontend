import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('should render input with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Buscar Pokémon por nome...')).toBeInTheDocument()
  })

  it('should display the provided value', () => {
    render(<SearchBar value="pikachu" onChange={() => {}} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('pikachu')
  })

  it('should call onChange after debounce', async () => {
    vi.useFakeTimers()
    const handleChange = vi.fn()
    
    render(<SearchBar value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: 'pikachu' } })
    
    expect(handleChange).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(500)
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('pikachu')
    })
    
    vi.useRealTimers()
  })

  it('should show clear button when there is value', () => {
    render(<SearchBar value="test" onChange={() => {}} />)
    expect(screen.getByLabelText('Limpar busca')).toBeInTheDocument()
  })

  it('should not show clear button when empty', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.queryByLabelText('Limpar busca')).not.toBeInTheDocument()
  })

  it('should clear input when clear button is clicked', () => {
    const handleChange = vi.fn()
    render(<SearchBar value="test" onChange={handleChange} />)
    
    const clearButton = screen.getByLabelText('Limpar busca')
    fireEvent.click(clearButton)
    
    expect(handleChange).toHaveBeenCalledWith('')
  })
})

