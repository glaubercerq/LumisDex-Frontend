import { Pokemon } from '@types/pokemon'
import { TYPE_COLORS, TYPE_NAMES_PT } from '@utils/constants'
import { formatPokemonId, formatPokemonName } from '@utils/formatters'
import './PokemonCard.scss'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: (pokemon: Pokemon) => void
  onToggleFavorite: (pokemon: Pokemon, e?: React.MouseEvent) => void
  isFavorite: boolean
}

export function PokemonCard({ pokemon, onClick, onToggleFavorite, isFavorite }: PokemonCardProps) {
  const mainType = pokemon.types[0]
  const mainColor = TYPE_COLORS[mainType]

  return (
    <article 
      className="pokemon-card"
      style={{ '--card-color': mainColor } as React.CSSProperties}
      onClick={() => onClick(pokemon)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(pokemon)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes de ${pokemon.name}`}
    >
      <div className="pokemon-card__background">
        <div className="pokemon-card__circle" />
      </div>

      <button
        className={`pokemon-card__favorite ${isFavorite ? 'pokemon-card__favorite--active' : ''}`}
        onClick={(e) => onToggleFavorite(pokemon, e)}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      
      <div className="pokemon-card__content">
        <span className="pokemon-card__id">
          {formatPokemonId(pokemon.id)}
        </span>
        
        <div className="pokemon-card__image-container">
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="pokemon-card__image"
            loading="lazy"
          />
        </div>

        <h3 className="pokemon-card__name">
          {formatPokemonName(pokemon.name)}
        </h3>

        <div className="pokemon-card__types">
          {pokemon.types.map((type) => (
            <span 
              key={type}
              className="pokemon-card__type"
              style={{ backgroundColor: TYPE_COLORS[type] }}
            >
              {TYPE_NAMES_PT[type]}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

