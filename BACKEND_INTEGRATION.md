# Integração com Backend

Este documento explica como o frontend está integrado com o backend da LumisDex API.

## Configuração

### 1. Variável de Ambiente

O frontend está configurado para se comunicar com o backend através da variável de ambiente `VITE_API_BASE_URL`.

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Se a variável não for definida, o padrão é `http://localhost:3001/api`.

### 2. Iniciar o Backend

Certifique-se de que o backend está rodando antes de iniciar o frontend:

```bash
cd ../LumisDex-Backend
docker-compose up -d
```

Ou, se estiver rodando localmente:

```bash
cd ../LumisDex-Backend
npm run dev
```

### 3. Iniciar o Frontend

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## Funcionalidades Integradas

### 🔍 Listagem de Pokémon
- **Endpoint:** `GET /pokemon?page=1&limit=20&type=fire`
- Lista Pokémon com paginação e filtro por tipo
- Todos os dados vêm do backend (não da PokeAPI diretamente)

### 🔎 Busca de Pokémon
- **Endpoint:** `GET /pokemon/search?q=pika`
- Busca Pokémon por nome (mínimo 2 caracteres)
- Resultados em tempo real com debounce

### ⭐ Sistema de Favoritos

#### Adicionar Favorito
- **Endpoint:** `POST /favorites`
- Clique no ícone de coração nos cards ou no modal
- Dados salvos no banco PostgreSQL

#### Remover Favorito
- **Endpoint:** `DELETE /favorites/pokemon/:pokemonId`
- Clique novamente no ícone de coração
- Remoção instantânea

#### Listar Favoritos
- **Endpoint:** `GET /favorites`
- Carregamento automático ao iniciar a aplicação
- Sincronização em tempo real

## Estrutura de Serviços

### `src/services/api.ts`
Configuração base da API:
- Define BASE_URL a partir da variável de ambiente
- Tratamento de erros HTTP
- Headers padrão (Content-Type: application/json)

### `src/services/pokemonService.ts`
Serviços relacionados a Pokémon:
- `getPokemonList()` - Lista paginada
- `searchPokemon()` - Busca por termo
- `getPokemonByIdOrName()` - Busca específica

### `src/services/favoritesService.ts`
Serviços relacionados a favoritos:
- `getFavorites()` - Lista todos os favoritos
- `addFavorite()` - Adiciona favorito
- `removeFavoriteByPokemonId()` - Remove favorito

## Hooks Customizados

### `usePokemon`
Gerencia estado e requisições de Pokémon:
- Loading, errors, paginação
- Busca e filtros integrados

### `useFavorites`
Gerencia estado de favoritos:
- `isFavorite(pokemonId)` - Verifica se é favorito
- `addToFavorites()` - Adiciona aos favoritos
- `removeFavoriteByPokemonId()` - Remove dos favoritos

## Testando a Integração

### 1. Verificar Conexão com Backend

Abra o console do navegador e verifique as requisições:
- Deve fazer requisições para `http://localhost:3001/api`
- Não deve fazer requisições para `pokeapi.co`

### 2. Testar Favoritos

1. Clique no coração de um Pokémon
2. Verifique no backend se o favorito foi salvo:
   ```bash
   curl http://localhost:3001/api/favorites
   ```
3. Recarregue a página - o coração deve permanecer preenchido

### 3. Testar Busca

1. Digite um nome de Pokémon na barra de busca
2. Verifique a requisição para `/pokemon/search?q=...`
3. Resultados devem aparecer em tempo real

## Troubleshooting

### Erro de CORS
Se você receber erros de CORS, verifique se o backend está configurado para aceitar requisições de `http://localhost:5173`.

### Backend não responde
1. Verifique se o backend está rodando: `docker ps` ou verifique o processo node
2. Teste o endpoint diretamente: `curl http://localhost:3001/api/health`
3. Verifique os logs do backend

### Favoritos não persistem
1. Verifique se o PostgreSQL está rodando
2. Verifique as migrations do banco
3. Verifique os logs do backend para erros

## Docker

Para rodar o frontend em Docker:

### Desenvolvimento
```bash
docker-compose --profile dev up dev
```

### Produção
```bash
docker-compose up app
```

**Importante:** Configure a variável de ambiente no docker-compose.yml:
```yaml
environment:
  - VITE_API_BASE_URL=http://backend:3001/api
```

## Arquitetura

```
Frontend (React + Vite)
    ↓
services/api.ts (fetch wrapper)
    ↓
Backend API (Express)
    ↓
PostgreSQL + Redis
```

Toda comunicação passa pelo backend. O frontend nunca acessa a PokeAPI diretamente.

