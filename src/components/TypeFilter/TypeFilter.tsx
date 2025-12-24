import { PokemonType } from '@types/pokemon'
import { POKEMON_TYPES, TYPE_COLORS, TYPE_NAMES_PT } from '@utils/constants'
import './TypeFilter.scss'

interface TypeFilterProps {
  selectedType: PokemonType | null
  onTypeSelect: (type: PokemonType | null) => void
}

export function TypeFilter({ selectedType, onTypeSelect }: TypeFilterProps) {
  const handleClick = (type: PokemonType) => {
    if (selectedType === type) {
      onTypeSelect(null)
    } else {
      onTypeSelect(type)
    }
  }

  return (
    <div className="type-filter">
      <h3 className="type-filter__title">Filtrar por tipo:</h3>
      <div className="type-filter__list">
        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            className={`type-filter__button ${selectedType === type ? 'type-filter__button--active' : ''}`}
            style={{ 
              '--type-color': TYPE_COLORS[type],
              '--type-color-dark': TYPE_COLORS[type]
            } as React.CSSProperties}
            onClick={() => handleClick(type)}
            aria-pressed={selectedType === type}
            type="button"
          >
            {TYPE_NAMES_PT[type]}
          </button>
        ))}
      </div>
    </div>
  )
}

