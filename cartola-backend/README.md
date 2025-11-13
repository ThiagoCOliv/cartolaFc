# Cartola Analytics API

API em TypeScript que fornece análises avançadas e estatísticas do Cartola FC, consultando a API pública do Cartola e oferecendo endpoints para análise de desempenho, previsões e estatísticas de times e jogadores.

## Principais Endpoints

### Dados Básicos
- GET /meta
  - Retorna metadados como `clubes` e `posicoes` (úteis para interfaces).
  
### Jogadores
- GET /players?posicao=<id>&clube=<id>
  - Retorna atletas com status "Provável" (status_id === 7).
  - Filtros opcionais: `posicao` e `clube`.
  - Ex.: `/players?posicao=3&clube=2305`

- GET /players/top
  - Retorna os jogadores mais indicados para próxima rodada.
  - Filtros opcionais: `posicao`.
  - Ex.: `/players/top?posicao=3`

### Análises e Estatísticas
- GET /previa-rodada
  - Previsão de desempenho para a rodada atual.
  - Inclui análise estatística e expectativas ajustadas.

- GET /data/estatisticas-times
  - Estatísticas detalhadas dos times.
  - Métricas de desempenho e tendências.

## Configuração e Execução

### Pré-requisitos
- Node.js
- npm ou yarn
- Excel (para funcionalidades de exportação de estatísticas)

### Instalação
```powershell
npm install
```

### Execução
```powershell
# Desenvolvimento (ts-node-dev)
npm run dev

# Produção
npm run build
npm start
```

### Variáveis de Ambiente
Copie `.env.example` para `.env` e configure:
- `PORT` — porta do servidor (padrão: 3000)
- `CARTOLA_URL` — URL base da API do Cartola (padrão: https://api.cartola.globo.com)

## Exemplos de Requisições (PowerShell)

### Metadados
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/meta' | ConvertTo-Json -Depth 5
```

### Jogadores Prováveis (filtrados)
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/players?posicao=3&clube=2305' | ConvertTo-Json -Depth 5
```

### Top Jogadores
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/players/top' | ConvertTo-Json -Depth 5
```

### Estatísticas de Times
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/data/estatisticas-times' | ConvertTo-Json -Depth 5
```

### Prévia da Rodada
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/previa-rodada' | ConvertTo-Json -Depth 5
```

## Estrutura do Projeto

### Diretórios Principais
```
src/
├── controllers/         # Controladores para cada funcionalidade
│   ├── estatisticasController.ts
│   ├── metaController.ts
│   ├── playersController.ts
│   ├── rodadaController.ts
│   └── topPlayersController.ts
├── helpers/            # Funções auxiliares de cálculo
│   ├── ajustarExpectativas.ts
│   └── calcularExpectativaGeral.ts
├── models/            # Modelos de dados
│   ├── atletaModel.ts
│   ├── clubeModel.ts
│   ├── estatisticasClubeModel.ts
│   ├── mercadoResponseModel.ts
│   └── posicaoModel.ts
├── routes/           # Definição de rotas
│   └── routes.ts
├── services/         # Serviços de integração
│   ├── apiClient.ts
│   ├── cartolaService.ts
│   └── excelService.ts
└── index.ts         # Ponto de entrada da aplicação
```

### Características Principais
- Arquitetura MVC
- Integração com Excel para exportação de dados
- Sistema de análise estatística
- Cálculos de expectativas e previsões
- Tipos TypeScript para segurança de dados

## Sugestões de Melhorias
- Implementar cache com TTL para otimizar chamadas à API
- Adicionar validação de parâmetros com Zod
- Desenvolver documentação OpenAPI/Swagger
- Implementar testes unitários e de integração
- Adicionar sistema de logs estruturados
- Implementar autenticação para endpoints sensíveis