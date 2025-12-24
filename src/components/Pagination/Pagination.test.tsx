import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('should render current page', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should disable previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />)
    const prevButton = screen.getByLabelText('Página anterior')
    expect(prevButton).toBeDisabled()
  })

  it('should disable next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />)
    const nextButton = screen.getByLabelText('Próxima página')
    expect(nextButton).toBeDisabled()
  })

  it('should call onPageChange when clicking next', () => {
    const handleChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} />)
    
    const nextButton = screen.getByLabelText('Próxima página')
    fireEvent.click(nextButton)
    
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('should call onPageChange when clicking previous', () => {
    const handleChange = vi.fn()
    render(<Pagination currentPage={5} totalPages={10} onPageChange={handleChange} />)
    
    const prevButton = screen.getByLabelText('Página anterior')
    fireEvent.click(prevButton)
    
    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('should call onPageChange when clicking a page number', () => {
    const handleChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} />)
    
    const page5 = screen.getByRole('button', { name: '5' })
    fireEvent.click(page5)
    
    expect(handleChange).toHaveBeenCalledWith(5)
  })

  it('should show ellipsis for many pages', () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />)
    const ellipsis = screen.getAllByText('...')
    expect(ellipsis.length).toBeGreaterThan(0)
  })
})

