# cartolaFc

Este repositório reúne dois projetos complementares para analisar e visualizar dados do CartolaFC:

- `cartola-backend`: API e serviços que processam dados, calculam expectativas e entregam endpoints consumíveis.
- `cartola-frontend`: Aplicação web em React/Vite que consome a API e oferece uma interface para explorar jogadores, times e estatísticas.

O objetivo deste README é oferecer uma visão unificada do sistema, instruções de instalação e execução, e pontos de contato para desenvolvimento e contribuição.

## Sumário

- Visão geral
- Principais funcionalidades
- Arquitetura e organização do repositório
- Como rodar o projeto (desenvolvimento)
- API / Rotas principais
- Dados e arquivos úteis
- Contribuição
- Licença

## Visão geral

O sistema facilita a análise de jogadores e times do CartolaFC, calculando expectativas a partir de dados agrupados e permitindo visualização por posição, clube e rodada. O backend centraliza a lógica de processamento, enquanto o frontend fornece filtros, visualizações e componentes de UI para tomada de decisão.

## Principais funcionalidades

- Obter estatísticas por jogador e por time
- Calcular expectativas gerais e por posição
- Listar top players por métrica
- Exportar ou consumir dados prontos via endpoints REST
- UI com filtros (posição, clube, rodada) e modais de destaque

## Arquitetura e organização do repositório

Estrutura principal:

- `cartola-backend/`
	- `src/` - código TypeScript do backend
		- `controllers/` - controladores (ex.: `playersController.ts`, `rodadaController.ts`)
		- `services/` - integração com APIs externas e lógica (ex.: `cartolaService.ts`, `apiClient.ts`)
		- `helpers/` - utilitários e cálculos de expectativa
		- `mappers/`, `models/`, `routes/` - mapeamento de dados, modelos e rotas
	- `data/` - arquivos de dados
	- `package.json`, `tsconfig.json` - config do projeto

- `cartola-frontend/`
	- `src/` - app React (TS)
		- `components/` - componentes de UI (listas de jogadores, filtros, modais)
		- `interfaces/` - tipos/contratos TypeScript
		- `styles/` - CSS, temas
	- `index.html`, `vite.config.ts`, `package.json`

## Tech stack

- Backend: Node.js + TypeScript, Express, módulos próprios para API client e cálculo.
- Frontend: React + TypeScript, Vite para bundling.

## Requisitos

- Node.js (versão LTS recomendada, ex.: 18 ou 20)
- npm ou yarn

## Como rodar (desenvolvimento)

As instruções abaixo assumem PowerShell no Windows (ajuste para bash se necessário).

1) Instalar dependências

Para o backend:

```powershell
cd cartola-backend
npm install
```

Para o frontend:

```powershell
cd cartola-frontend
npm install
```

2) Rodar o backend em modo de desenvolvimento

```powershell
cd cartola-backend
npm run dev
```

Verifique o `package.json` do `cartola-backend` para o script exato (por exemplo `dev` ou `start:dev`).

3) Rodar o frontend em modo de desenvolvimento

```powershell
cd cartola-frontend
npm run dev
```

O frontend geralmente abrirá em `http://localhost:5173` (Vite). O frontend está configurado para consumir a API do backend — verifique as variáveis de ambiente ou os caminhos em `src` caso precise ajustar a URL da API.

## Variáveis de ambiente

Se o backend ou frontend exigirem variáveis de ambiente (por exemplo URL da API externa, chaves, portas), crie um arquivo `.env` nos diretórios correspondentes seguindo as convenções do projeto. Exemplos comuns:

- `PORT=3000`
- `API_BASE_URL=http://localhost:3000`

Consulte os arquivos `src` e `config` para nomes exatos das variáveis.

## Endpoints principais (resumo)

O backend expõe rotas que cobrem estatísticas, jogadores, rodadas e top players. Exemplos (ver `cartola-backend/src/routes/routes.ts` para a lista completa):

- GET /players - lista de jogadores com estatísticas e expectativas
- GET /previa-rodada - dados e partidas da próxima rodada
- GET /players/top - jogadores filtrados por top métricas

Use o Postman, Insomnia ou o próprio frontend para testar os endpoints.

## Dados e arquivos úteis

- `cartola-backend/data/cartola_sample.json` - amostra de dados usada para desenvolvimento/testes.
- `cartola-backend/src/helpers/` - lógica de cálculo de expectativa e transformação de dados.

## Desenvolvimento e testes

- Siga a convenção de lint e formatação do projeto (ver `eslint.config.js` no frontend e configs TypeScript).
- Adicione testes unitários nas pastas correspondentes (framework sugerido: Jest ou Vitest para o frontend).

Scripts úteis (ver `package.json` de cada subprojeto):

- `npm run dev` - executa em modo de desenvolvimento
- `npm run build` - empacota para produção
- `npm test` - executa testes

## Implantação (breve)

- Backend: empacotar/compilar TypeScript e subir em uma VM/container (Docker), ou serviços serverless. Garanta variáveis de ambiente e conexão com qualquer serviço externo.
- Frontend: gerar build estático (`npm run build`) e servir via CDN, Netlify, Vercel ou um servidor estático.

## Contribuição

Contribuições são bem-vindas. Procedimento sugerido:

1. Abra uma issue descrevendo a proposta ou bug.
2. Crie uma branch com prefixo `feature/` ou `fix/`.
3. Faça commits claros e pequenos.
4. Abra um Pull Request descrevendo as mudanças e o motivo.
