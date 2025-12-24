import { fetchFromApi } from './api'
import { 
  Pokemon, 
  PokemonType, 
  PokemonListResponse, 
  PokemonApiResponse 
} from '@types/pokemon'

function mapPokemonResponse(data: PokemonApiResponse): Pokemon {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map(t => t.type.name as PokemonType),
    stats: data.stats.map(s => ({
      name: s.stat.name,
      value: s.base_stat
    })),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(a => a.ability.name)
  }
}

export async function getPokemonList(
  page: number, 
  limit: number
): Promise<{ pokemons: Pokemon[]; totalCount: number }> {
  const offset = (page - 1) * limit
  
  const listData = await fetchFromApi<PokemonListResponse>(
    `/pokemon?offset=${offset}&limit=${limit}`
  )
  
  const pokemonPromises = listData.results.map(async (pokemon) => {
    const id = pokemon.url.split('/').filter(Boolean).pop()
    const data = await fetchFromApi<PokemonApiResponse>(`/pokemon/${id}`)
    return mapPokemonResponse(data)
  })
  
  const pokemons = await Promise.all(pokemonPromises)
  
  return {
    pokemons,
    totalCount: listData.count
  }
}

export async function searchPokemon(term: string): Promise<Pokemon | null> {
  try {
    const data = await fetchFromApi<PokemonApiResponse>(
      `/pokemon/${term.toLowerCase()}`
    )
    return mapPokemonResponse(data)
  } catch {
    return null
  }
}

export async function getPokemonsByType(
  type: PokemonType,
  page: number,
  limit: number
): Promise<{ pokemons: Pokemon[]; totalCount: number }> {
  const typeData = await fetchFromApi<{
    pokemon: { pokemon: { name: string; url: string } }[]
  }>(`/type/${type}`)
  
  const offset = (page - 1) * limit
  const paginatedPokemon = typeData.pokemon.slice(offset, offset + limit)
  
  const pokemonPromises = paginatedPokemon.map(async (p) => {
    const id = p.pokemon.url.split('/').filter(Boolean).pop()
    const data = await fetchFromApi<PokemonApiResponse>(`/pokemon/${id}`)
    return mapPokemonResponse(data)
  })
  
  const pokemons = await Promise.all(pokemonPromises)
  
  return {
    pokemons,
    totalCount: typeData.pokemon.length
  }
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  const data = await fetchFromApi<PokemonApiResponse>(`/pokemon/${id}`)
  return mapPokemonResponse(data)
}

