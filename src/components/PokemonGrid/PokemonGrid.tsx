import { Pokemon } from '@types/pokemon'
import { PokemonCard } from '@components/PokemonCard/PokemonCard'
import { LoadingSpinner } from '@components/LoadingSpinner/LoadingSpinner'
import './PokemonGrid.scss'

interface PokemonGridProps {
  pokemons: Pokemon[]
  isLoading: boolean
  onPokemonClick: (pokemon: Pokemon) => void
  onToggleFavorite: (pokemon: Pokemon, e?: React.MouseEvent) => void
  isFavorite: (pokemonId: number) => boolean
}

export function PokemonGrid({ 
  pokemons, 
  isLoading, 
  onPokemonClick,
  onToggleFavorite,
  isFavorite
}: PokemonGridProps) {
  if (isLoading) {
    return (
      <div className="pokemon-grid__loading">
        <LoadingSpinner />
        <p>Carregando Pokémon...</p>
      </div>
    )
  }

  if (pokemons.length === 0) {
    return (
      <div className="pokemon-grid__empty">
        <div className="pokemon-grid__empty-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3>Nenhum Pokémon encontrado</h3>
        <p>Tente buscar por outro nome ou remova os filtros</p>
      </div>
    )
  }

  return (
    <section className="pokemon-grid" aria-label="Lista de Pokémon">
      <div className="pokemon-grid__container">
        {pokemons.map((pokemon, index) => (
          <div 
            key={pokemon.id} 
            className="pokemon-grid__item"
            style={{ '--animation-delay': `${index * 50}ms` } as React.CSSProperties}
          >
            <PokemonCard 
              pokemon={pokemon} 
              onClick={onPokemonClick}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(pokemon.id)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

