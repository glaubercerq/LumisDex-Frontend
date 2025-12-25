import { useState, useCallback } from 'react'
import { Pokemon, PokemonType } from '@types/pokemon'
import { 
  getPokemonList, 
  searchPokemon, 
  getPokemonsByType 
} from '@services/pokemonService'

interface UsePokemonReturn {
  pokemons: Pokemon[]
  totalCount: number
  isLoading: boolean
  error: string | null
  fetchPokemons: (
    page: number, 
    limit: number, 
    searchTerm?: string, 
    type?: PokemonType | null
  ) => Promise<void>
}

export function usePokemon(): UsePokemonReturn {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemons = useCallback(async (
    page: number, 
    limit: number, 
    searchTerm?: string, 
    type?: PokemonType | null
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      if (searchTerm && searchTerm.trim()) {
        const pokemon = await searchPokemon(searchTerm.trim())
        if (pokemon) {
          if (type && !pokemon.types.includes(type)) {
            setPokemons([])
            setTotalCount(0)
          } else {
            setPokemons([pokemon])
            setTotalCount(1)
          }
        } else {
          setPokemons([])
          setTotalCount(0)
        }
        return
      }

      if (type) {
        const result = await getPokemonsByType(type, page, limit)
        setPokemons(result.pokemons)
        setTotalCount(result.totalCount)
        return
      }

      const result = await getPokemonList(page, limit)
      setPokemons(result.pokemons)
      setTotalCount(result.totalCount)

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar Pokémon'
      setError(message)
      setPokemons([])
      setTotalCount(0)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    pokemons,
    totalCount,
    isLoading,
    error,
    fetchPokemons
  }
}

