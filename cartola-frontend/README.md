# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Cartola-Frontend

    Aplicação frontend em React + TypeScript (Vite) para visualização de jogadores prováveis da rodada, filtros por clube/posição, pré-visualização de partidas e destaques dos melhores jogadores.

    Este README foi atualizado para refletir o estado atual do projeto: componentes principais, arquitetura, sistema de tema, expectativas de backend e instruções de execução.

    ## Visão geral

    - Tech stack: React, TypeScript, Vite, CSS modular por componente.
    - Objetivo: mostrar jogadores prováveis da rodada em uma tabela ordenável, fornecer filtros (clube/posição/top-players), abrir modais com detalhes do clube e visualizar prévia dos jogos.
    - Estado atual: a maior parte das features de UI está implementada — PlayerList com sorting, filtros controlados, coluna de estrelas para top players, ClubModal, HighlightTeamsModal e sistema de tema (dark/light) com persistência.

    ## Principais funcionalidades

    - Lista de jogadores em tabela com ordenação por colunas.
    - Filtro por clube e posição (componentizado como `Filters` e controlado por `PlayerList`).
    - Coluna "estrelas" para destacar top players; filtro para exibir apenas top players.
    - Modal do clube (`ClubModal`) com informações do clube e estilo compartilhado de modal.
    - Modal de times de destaque (`HighlightTeamsModal`) usado na visualização de rodadas.
    - Sistema de tema (light/dark): detecta preferências do sistema, persiste escolha em `localStorage` e aplica via atributo `data-theme` no `document.documentElement`.

    ## Estrutura relevante (resumida)

    - `src/components/`
      - `PlayerList.tsx` — lista/tabela principal dos jogadores; gerencia filtros, ordenação, top players e abertura de modais.
      - `Filters.tsx` — selects controlados para clube/posição. Busca clubes via `/meta`.
      - `RoundMatches.tsx` — lista de partidas da rodada e botão para abrir `HighlightTeamsModal`.
      - `ClubModal.tsx` — modal com informações do clube.
      - `HighlightTeamsModal.tsx` — modal para exibir equipes ofensivas/defensivas.
      - `ThemeToggle.tsx` — botão para alternar temas (usa `useTheme`).

    - `src/hooks/useTheme.ts` — hook que detecta/persiste tema e atualiza `document.documentElement.dataset.theme`.
    - `src/styles/` — variáveis (`variables.css`), `globals.css`, `Modal.css` e estilos por componente (e.g., `PlayerList.css`, `Filters.css`).
    - `src/interfaces/` — interfaces/types organizadas por arquivo (ex.: `ExpectativaGeral`, `Atleta`, etc.).
# Cartola-Frontend

Aplicação frontend em React e TypeScript (Vite) para visualização de jogadores prováveis da rodada, filtros por clube/posição, pré-visualização de partidas e destaques dos melhores jogadores.

Este README descreve o estado atual do projeto: funcionalidades, arquitetura, sistema de tema, endpoints esperados e instruções de execução.

## Visão geral

- Stack: React, TypeScript, Vite, CSS modular por componente.
- Objetivo: exibir jogadores prováveis da rodada em uma tabela ordenável, fornecer filtros (clube/posição/top-players), abrir modais com detalhes do clube e visualizar prévia dos jogos.
- Estado atual: a maior parte das features de interface está implementada — `PlayerList` com ordenação, filtros controlados, coluna de estrelas para top players, `ClubModal`, `HighlightTeamsModal` e sistema de tema (claro/escuro) com persistência.

## Principais funcionalidades

- Lista de jogadores em tabela com ordenação por colunas.
- Filtro por clube e posição (componente `Filters`, controlado por `PlayerList`).
- Coluna "estrelas" para destacar top players; filtro para exibir apenas top players.
- Modal do clube (`ClubModal`) com informações do clube.
- Modal de times de destaque (`HighlightTeamsModal`) usado na visualização de rodadas.
- Sistema de tema (claro/escuro): detecta a preferência do sistema, persiste a escolha em `localStorage` e aplica via atributo `data-theme` no `document.documentElement`.

## Estrutura relevante (resumida)

- `src/components/`
  - `PlayerList.tsx` — lista/tabela principal dos jogadores; gerencia filtros, ordenação, destaques e abertura de modais.
  - `Filters.tsx` — selects controlados para clube/posição; busca clubes via `/meta`.
  - `RoundMatches.tsx` — lista de partidas da rodada e botão para abrir `HighlightTeamsModal`.
  - `ClubModal.tsx` — modal com informações do clube.
  - `HighlightTeamsModal.tsx` — modal para exibir equipes ofensivas/defensivas.
  - `ThemeToggle.tsx` — botão para alternar temas (usa `useTheme`).

- `src/hooks/useTheme.ts` — hook que detecta e persiste o tema, atualizando `document.documentElement.dataset.theme`.
- `src/styles/` — variáveis (`variables.css`), `globals.css`, `Modal.css` e estilos por componente (por exemplo, `PlayerList.css`, `Filters.css`).
- `src/interfaces/` — interfaces e tipos organizados por arquivo (ex.: `ExpectativaGeral`, `Atleta`, etc.).

## Expectativas / contratos com o backend

O frontend consome alguns endpoints que devem estar disponíveis (nomes e formato esperado):

- `GET /players` — lista de jogadores; payload esperado: `data.atletas` (mapa/array de atletas) ou equivalente.
- `GET /players/top` — melhores jogadores da rodada; usado para extrair ids e marcar estrelas (o código lida com `data` ou `data.atletas`, com extrações defensivas).
- `GET /previa-rodada` — partidas da rodada (usado por `RoundMatches`).
- `GET /meta` — lista de clubes (usado por `Filters` e `ClubModal`).

Observação: há proteções simples no código para variações na forma do JSON retornado, mas recomenda-se verificar os formatos reais da API em execução.

## Sistema de tema

- Implementação: `src/hooks/useTheme.ts`.
- Comportamento:
  - Verifica `localStorage.getItem('theme')` para valor salvo.
  - Caso não exista, usa `window.matchMedia('(prefers-color-scheme: dark)')` para detectar a preferência do sistema.
  - Persiste a escolha em `localStorage` e ajusta `document.documentElement.dataset.theme = 'dark'|'light'`.
  - O CSS define variáveis em `:root[data-theme='dark']` e `:root[data-theme='light']` em `src/styles/variables.css`.

Use o componente `ThemeToggle` no cabeçalho para alternar manualmente.

## Como executar (desenvolvimento)

1. Abra um terminal na pasta `cartola-frontend`:

```powershell
cd "c:\Users\thiag\Desktop\Futebol\cartola-frontend"
npm install
npm run dev
```

2. Abra o endereço exibido pelo Vite (por exemplo, `http://localhost:5173`).

Observações:

- O script de desenvolvimento do frontend não inicia o backend; garanta que a API (endpoints listados acima) esteja disponível durante o desenvolvimento.
- Se o projeto usar workspaces ou dependências em outra pasta, ajuste a instalação conforme necessário.

## Build (produção)

```powershell
npm run build
npm run preview
```

## Testes e lint

- Não há testes automatizados incluídos por padrão (adicionar Vitest/Jest + React Testing Library é recomendado).
- Lint e checagem de tipos: configure `eslint` e `tsc` conforme o fluxo do projeto (há `tsconfig` e arquivos de configuração no repositório).

## Notas de desenvolvimento / decisões importantes

- `Filters` é um componente controlado por `PlayerList` para evitar problemas visuais quando a lista filtrada fica vazia.
- A coluna de destaques (estrelas) substitui pseudo-elementos para permitir ordenação e filtro por top players.
- Estilos foram modularizados: cada componente tem seu `.css` e existem estilos compartilhados em `src/styles` (variáveis, globals e modal base).

## Próximos passos sugeridos

- Adicionar testes unitários e de integração.
- Criar scripts/infra para executar o backend localmente em modo dev (ou fornecer mocks) para facilitar o desenvolvimento offline.
- Polimento visual cross-browser (scrollbars de modal, transições de tema) e testes em dispositivos móveis.
- Validar formatos reais da API e remover `any`/asserções desnecessárias nos mappers quando o contrato estiver definido.

## Contribuindo

- Fork → branch → PR. Mantenha o escopo das PRs pequeno e descreva as alterações.

---