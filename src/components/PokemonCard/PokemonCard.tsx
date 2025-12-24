import { Pokemon } from '@types/pokemon'
import { TYPE_COLORS, TYPE_NAMES_PT } from '@utils/constants'
import { formatPokemonId, formatPokemonName } from '@utils/formatters'
import './PokemonCard.scss'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: (pokemon: Pokemon) => void
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
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

