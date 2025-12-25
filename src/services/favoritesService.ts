import { fetchFromApi } from './api'
import { Favorite, ListFavoritesResponse, ApiErrorResponse } from '@types/pokemon'

export async function getFavorites(): Promise<Favorite[]> {
  try {
    const response = await fetchFromApi<ListFavoritesResponse>('/favorites')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getFavoriteById(id: number): Promise<Favorite> {
  try {
    const favorite = await fetchFromApi<Favorite>(`/favorites/${id}`)
    return favorite
  } catch (error) {
    throw error
  }
}

export async function addFavorite(
  pokemonId: number,
  pokemonName: string
): Promise<Favorite> {
  try {
    const favorite = await fetchFromApi<Favorite>('/favorites', {
      method: 'POST',
      body: JSON.stringify({
        pokemon_id: pokemonId,
        pokemon_name: pokemonName,
      }),
    })
    return favorite
  } catch (error) {
    throw error
  }
}

export async function removeFavoriteById(id: number): Promise<void> {
  try {
    await fetchFromApi<void>(`/favorites/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    throw error
  }
}

export async function removeFavoriteByPokemonId(pokemonId: number): Promise<void> {
  try {
    await fetchFromApi<void>(`/favorites/pokemon/${pokemonId}`, {
      method: 'DELETE',
    })
  } catch (error) {
    throw error
  }
}

