export type PokemonType = 
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'

export interface PokemonStat {
  name: string
  value: number
}

export interface Pokemon {
  id: number
  name: string
  image: string
  types: PokemonType[]
  stats: PokemonStat[]
  height: number
  weight: number
  abilities: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ListPokemonResponse extends PaginatedResponse<Pokemon> {}

export interface SearchPokemonResponse {
  data: Pokemon[]
  total: number
}

export interface Favorite {
  id: number
  pokemon_id: number
  pokemon_name: string
  created_at: string
  updated_at: string
}

export interface ListFavoritesResponse {
  data: Favorite[]
  total: number
}

export interface ApiErrorResponse {
  error: string
  stack?: string
}

export interface PokemonApiResponse {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  height: number
  weight: number
  abilities: {
    ability: {
      name: string
    }
  }[]
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

