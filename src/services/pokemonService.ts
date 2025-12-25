import { fetchFromApi } from './api'
import { 
  Pokemon, 
  PokemonType, 
  ListPokemonResponse,
  SearchPokemonResponse
} from '@types/pokemon'

export async function getPokemonList(
  page: number = 1, 
  limit: number = 20,
  type?: PokemonType
): Promise<{ pokemons: Pokemon[]; totalCount: number }> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })
  
  if (type) {
    params.append('type', type)
  }
  
  const response = await fetchFromApi<ListPokemonResponse>(
    `/pokemon?${params.toString()}`
  )
  
  return {
    pokemons: response.data,
    totalCount: response.total
  }
}

export async function searchPokemon(term: string): Promise<Pokemon[]> {
  if (term.length < 2) {
    return []
  }
  
  try {
    const params = new URLSearchParams({ q: term })
    const response = await fetchFromApi<SearchPokemonResponse>(
      `/pokemon/search?${params.toString()}`
    )
    return response.data
  } catch {
    return []
  }
}

export async function getPokemonByIdOrName(idOrName: string | number): Promise<Pokemon> {
  const pokemon = await fetchFromApi<Pokemon>(`/pokemon/${idOrName}`)
  return pokemon
}

export async function getPokemonsByType(
  type: PokemonType,
  page: number,
  limit: number
): Promise<{ pokemons: Pokemon[]; totalCount: number }> {
  return getPokemonList(page, limit, type)
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  return getPokemonByIdOrName(id)
}

