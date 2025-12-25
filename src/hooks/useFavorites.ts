import { useState, useCallback, useEffect } from 'react'
import {
  getFavorites,
  addFavorite,
  removeFavoriteById,
  removeFavoriteByPokemonId,
} from '@services/favoritesService'
import { Favorite } from '@types/pokemon'

interface UseFavoritesReturn {
  favorites: Favorite[]
  isLoading: boolean
  error: string | null
  refreshFavorites: () => Promise<void>
  addToFavorites: (pokemonId: number, pokemonName: string) => Promise<void>
  removeFromFavorites: (id: number) => Promise<void>
  removeFavoriteByPokemonId: (pokemonId: number) => Promise<void>
  isFavorite: (pokemonId: number) => boolean
  getFavoriteId: (pokemonId: number) => number | null
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshFavorites = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getFavorites()
      setFavorites(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar favoritos'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addToFavorites = useCallback(async (pokemonId: number, pokemonName: string) => {
    try {
      const favorite = await addFavorite(pokemonId, pokemonName)
      setFavorites(prev => [...prev, favorite])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao adicionar favorito'
      setError(message)
      throw err
    }
  }, [])

  const removeFromFavorites = useCallback(async (id: number) => {
    try {
      await removeFavoriteById(id)
      setFavorites(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao remover favorito'
      setError(message)
      throw err
    }
  }, [])

  const removeFavoriteByPokemonIdHandler = useCallback(async (pokemonId: number) => {
    try {
      await removeFavoriteByPokemonId(pokemonId)
      setFavorites(prev => prev.filter(f => f.pokemon_id !== pokemonId))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao remover favorito'
      setError(message)
      throw err
    }
  }, [])

  const isFavorite = useCallback((pokemonId: number): boolean => {
    return favorites.some(f => f.pokemon_id === pokemonId)
  }, [favorites])

  const getFavoriteId = useCallback((pokemonId: number): number | null => {
    const favorite = favorites.find(f => f.pokemon_id === pokemonId)
    return favorite ? favorite.id : null
  }, [favorites])

  useEffect(() => {
    refreshFavorites()
  }, [refreshFavorites])

  return {
    favorites,
    isLoading,
    error,
    refreshFavorites,
    addToFavorites,
    removeFromFavorites,
    removeFavoriteByPokemonId: removeFavoriteByPokemonIdHandler,
    isFavorite,
    getFavoriteId,
  }
}

