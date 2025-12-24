# LumisDex Frontend

Uma Pokédex interativa construída com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **SCSS** - Pré-processador CSS
- **Vitest** - Framework de testes unitários
- **Playwright** - Testes E2E
- **ESLint** - Linting de código

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header/         # Cabeçalho da aplicação
│   ├── SearchBar/      # Barra de busca
│   ├── TypeFilter/     # Filtro por tipo
│   ├── PokemonGrid/    # Grid de cards
│   ├── PokemonCard/    # Card individual
│   ├── PokemonModal/   # Modal de detalhes
│   ├── Pagination/     # Navegação de páginas
│   └── LoadingSpinner/ # Indicador de carregamento
├── hooks/              # Hooks customizados
├── services/           # Serviços de API
├── styles/             # Estilos globais SCSS
├── types/              # Definições de tipos TypeScript
├── utils/              # Funções utilitárias
└── test/               # Configuração de testes
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes com UI
npm run test:ui

# Cobertura de testes
npm run test:coverage

# Testes E2E (Playwright)
npm run test:e2e
```

## 📋 Funcionalidades

- ✅ Listagem de Pokémon com dados da PokéAPI
- ✅ Busca por nome sem recarregar a página
- ✅ Filtro por tipo de Pokémon
- ✅ Paginação com navegação intuitiva
- ✅ Modal com detalhes do Pokémon
- ✅ Design responsivo (mobile e desktop)
- ✅ Animações e transições suaves
- ✅ Acessibilidade (ARIA labels, navegação por teclado)

## 🎨 Design

O design segue uma estética moderna e vibrante, com:

- Cores baseadas nos tipos de Pokémon
- Animações suaves para melhor UX
- Cards interativos com hover effects
- Loading spinner estilizado como Pokébola
- Modal com estatísticas em barras de progresso

## 📝 Git Flow

Este projeto segue o Git Flow:

- `main` - Código de produção
- `develop` - Branch de desenvolvimento
- `feature/*` - Features em desenvolvimento
- `release/*` - Preparação para release
- `hotfix/*` - Correções urgentes

## 📄 Licença

MIT

