import { useState, useEffect, useCallback } from 'react'
import { Header } from '@components/Header/Header'
import { SearchBar } from '@components/SearchBar/SearchBar'
import { TypeFilter } from '@components/TypeFilter/TypeFilter'
import { PokemonGrid } from '@components/PokemonGrid/PokemonGrid'
import { Pagination } from '@components/Pagination/Pagination'
import { PokemonModal } from '@components/PokemonModal/PokemonModal'
import { usePokemon } from '@hooks/usePokemon'
import { Pokemon, PokemonType } from '@types/pokemon'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pokemonsPerPage = 20

  const { 
    pokemons, 
    totalCount, 
    isLoading, 
    error,
    fetchPokemons 
  } = usePokemon()

  useEffect(() => {
    fetchPokemons(currentPage, pokemonsPerPage, searchTerm, selectedType)
  }, [currentPage, searchTerm, selectedType, fetchPokemons])

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  const handleTypeFilter = useCallback((type: PokemonType | null) => {
    setSelectedType(type)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handlePokemonClick = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedPokemon(null)
  }, [])

  const totalPages = Math.ceil(totalCount / pokemonsPerPage)

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="filters-section">
            <SearchBar 
              value={searchTerm} 
              onChange={handleSearch} 
            />
            <TypeFilter 
              selectedType={selectedType} 
              onTypeSelect={handleTypeFilter} 
            />
          </div>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <PokemonGrid 
            pokemons={pokemons} 
            isLoading={isLoading}
            onPokemonClick={handlePokemonClick}
          />

          {!isLoading && !error && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>

      {isModalOpen && selectedPokemon && (
        <PokemonModal 
          pokemon={selectedPokemon} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App

