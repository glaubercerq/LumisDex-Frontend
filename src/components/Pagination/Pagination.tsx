import './Pagination.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    pages.push(totalPages)

    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className="pagination" aria-label="Navegação de páginas">
      <button
        className="pagination__button pagination__button--arrow"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        type="button"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="pagination__pages">
        {visiblePages.map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={page}
              className={`pagination__button ${currentPage === page ? 'pagination__button--active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              type="button"
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${index}`} className="pagination__ellipsis">
              {page}
            </span>
          )
        ))}
      </div>

      <button
        className="pagination__button pagination__button--arrow"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
        type="button"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  )
}

