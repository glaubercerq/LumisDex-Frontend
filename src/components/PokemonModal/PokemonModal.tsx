import { useEffect, useCallback } from 'react'
import { Pokemon } from '@types/pokemon'
import { TYPE_COLORS, TYPE_NAMES_PT, STAT_NAMES_PT } from '@utils/constants'
import { 
  formatPokemonId, 
  formatPokemonName, 
  formatHeight, 
  formatWeight 
} from '@utils/formatters'
import './PokemonModal.scss'

interface PokemonModalProps {
  pokemon: Pokemon
  onClose: () => void
}

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const mainType = pokemon.types[0]
  const mainColor = TYPE_COLORS[mainType]

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const maxStat = Math.max(...pokemon.stats.map(s => s.value))

  return (
    <div 
      className="pokemon-modal"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-modal-title"
    >
      <div 
        className="pokemon-modal__content"
        style={{ '--modal-color': mainColor } as React.CSSProperties}
      >
        <button 
          className="pokemon-modal__close"
          onClick={onClose}
          aria-label="Fechar modal"
          type="button"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="pokemon-modal__header">
          <div className="pokemon-modal__image-container">
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              className="pokemon-modal__image"
            />
          </div>
        </div>

        <div className="pokemon-modal__body">
          <span className="pokemon-modal__id">
            {formatPokemonId(pokemon.id)}
          </span>
          
          <h2 id="pokemon-modal-title" className="pokemon-modal__name">
            {formatPokemonName(pokemon.name)}
          </h2>

          <div className="pokemon-modal__types">
            {pokemon.types.map((type) => (
              <span 
                key={type}
                className="pokemon-modal__type"
                style={{ backgroundColor: TYPE_COLORS[type] }}
              >
                {TYPE_NAMES_PT[type]}
              </span>
            ))}
          </div>

          <div className="pokemon-modal__info">
            <div className="pokemon-modal__info-item">
              <span className="pokemon-modal__info-value">
                {formatHeight(pokemon.height)}
              </span>
              <span className="pokemon-modal__info-label">Altura</span>
            </div>
            <div className="pokemon-modal__info-divider" />
            <div className="pokemon-modal__info-item">
              <span className="pokemon-modal__info-value">
                {formatWeight(pokemon.weight)}
              </span>
              <span className="pokemon-modal__info-label">Peso</span>
            </div>
          </div>

          <div className="pokemon-modal__section">
            <h3 className="pokemon-modal__section-title">Habilidades</h3>
            <div className="pokemon-modal__abilities">
              {pokemon.abilities.map((ability) => (
                <span key={ability} className="pokemon-modal__ability">
                  {formatPokemonName(ability)}
                </span>
              ))}
            </div>
          </div>

          <div className="pokemon-modal__section">
            <h3 className="pokemon-modal__section-title">Estatísticas</h3>
            <div className="pokemon-modal__stats">
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="pokemon-modal__stat">
                  <span className="pokemon-modal__stat-name">
                    {STAT_NAMES_PT[stat.name] || stat.name}
                  </span>
                  <div className="pokemon-modal__stat-bar-container">
                    <div 
                      className="pokemon-modal__stat-bar"
                      style={{ 
                        width: `${(stat.value / maxStat) * 100}%`,
                        backgroundColor: mainColor
                      }}
                    />
                  </div>
                  <span className="pokemon-modal__stat-value">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

