import './LoadingSpinner.scss'

export function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-label="Carregando">
      <div className="loading-spinner__pokeball">
        <div className="loading-spinner__pokeball-top" />
        <div className="loading-spinner__pokeball-center" />
        <div className="loading-spinner__pokeball-bottom" />
      </div>
    </div>
  )
}

