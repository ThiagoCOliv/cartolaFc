# CSS Organization Guide - Cartola FC Frontend

## Estrutura de CSS Organizado

O projeto foi organizado com cada componente tendo seu próprio arquivo CSS específico, enquanto estilos compartilhados foram centralizados em arquivos separados.

### 📁 Estrutura de Arquivos

```
cartola-frontend/src/
├── index.css                      # Importa apenas globals.css
├── App.tsx                        # Importa './components/App.css'
├── styles/
│   ├── variables.css              # Variáveis CSS compartilhadas
│   ├── globals.css                # Estilos globais (body, html, #root)
│   └── Modal.css                  # Estilos compartilhados para modais
└── components/
    ├── App.css                    # Estilos do container principal
    ├── Filters.css                # Estilos do componente Filters
    ├── PlayerList.css             # Estilos do componente PlayerList
    ├── RoundMatches.css           # Estilos do componente RoundMatches
    ├── ThemeToggle.css            # Estilos específicos do ThemeToggle
    ├── ClubModal.css              # Estilos específicos do ClubModal
    ├── HighlightTeamsModal.css    # Estilos específicos do HighlightTeamsModal
    ├── App.tsx
    ├── Filters.tsx
    ├── PlayerList.tsx
    ├── RoundMatches.tsx
    ├── ThemeToggle.tsx
    ├── ClubModal.tsx
    └── HighlightTeamsModal.tsx
```

### 🎨 Organização de Estilos

#### 1. **src/styles/variables.css**
Define todas as variáveis CSS compartilhadas:
- Cores (primary, secondary, text, background, border)
- Espaçamentos (border-radius, shadow)
- Facilita mudanças de tema globais

**Exemplo:**
```css
:root {
  --color-primary: #ff6b00;
  --color-primary-dark: #cc5500;
  --border-radius: 8px;
}
```

#### 2. **src/styles/globals.css**
Estilos globais que se aplicam a toda a aplicação:
- Estilos base de body, html
- #root styles
- Animations globais
- Reset de estilos padrão

**Exemplo:**
```css
@import './variables.css';

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}
```

#### 3. **src/styles/Modal.css**
Estilos compartilhados entre ClubModal e HighlightTeamsModal:
- `.modal-overlay` - Fundo escuro com efeito de overlay
- `.modal-content` - Caixa do modal
- `.modal-close-btn` / `.modal-close` - Botão de fechar
- `@keyframes fadeIn` - Animação de entrada
- `@keyframes slideIn` - Animação de slide

**Importado por:** ClubModal.css, HighlightTeamsModal.css

#### 4. **src/components/App.css**
Estilos do componente App e layout principal:
- `.container` - Container com max-width
- `.controls` - Flexbox para filtros e botão
- `h1` - Título principal
- `.show-matches-btn` - Botão de alternar view
- Media queries responsivas

#### 5. **src/components/Filters.css**
Estilos específicos do componente Filters:
- `.filters` - Container flex
- `.filter-group` - Agrupamento label + select
- `select` - Estilo customizado de dropdowns
- Estados hover e focus

#### 6. **src/components/PlayerList.css**
Estilos da tabela de jogadores e filtros:
- `.players-grid` - Container da tabela
- `.players-table` - Estilos da tabela (thead, tbody, th, td)
- `.filter-top-players` - Checkbox para filtrar top players
- `.stars-col` / `.stars-cell` - Coluna de estrelas (★)
- `.top-player` - Estilo de linha destacada
- `.player-photo` / `.player-apelido` - Elementos internos
- Media queries para responsividade

#### 7. **src/components/ThemeToggle.css**
Estilos do componente de botão para alternar o tema da aplicação:

- `.theme-toggle` - Botão de trocar tema
- Estados hover e active
- Media queries para responsividade

#### 8. **src/components/RoundMatches.css**
Estilos do componente de jogos da rodada:
- `.matches-container` - Container principal
- `.matches-header` - Header com título e botão de destaques
- `.highlights-btn` - Botão "⭐ Times Destaques"
- `.matches-grid` - Grid de cards de matches
- `.match-card` - Card individual de jogo
- `.match-teams` / `.team` / `.vs` - Elementos de equipes
- Media queries para layout responsivo

#### 9. **src/components/ClubModal.css**
Estilos específicos do ClubModal (além dos compartilhados):
```css
@import '../styles/variables.css';
@import '../styles/Modal.css';  /* Reutiliza estilos compartilhados */
```
- `.modal-header` - Header com escudo e nome do time
- `.modal-body` - Corpo scrollable com custom scrollbar
- `.modal-section` - Seções (Expectativas, Estatísticas, etc)
- `.modal-grid` / `.modal-item` - Grid de informações
- Scrollbar customizada com cor laranja

#### 10. **src/components/HighlightTeamsModal.css**
Estilos específicos do HighlightTeamsModal:
```css
@import '../styles/variables.css';
@import '../styles/Modal.css';  /* Reutiliza estilos compartilhados */
```
- `.highlight-modal h3` - Título do modal
- `.highlights-container` - Grid de dois painéis
- `.highlight-section` / `.highlight-item` - Cards de times
- `.rank` / `.team-name` / `.points` - Elementos internos
- Media queries para mobile (1 coluna)

### 🔄 Padrão de Imports

**Em componentes (exemplo PlayerList.tsx):**
```tsx
import './PlayerList.css';
```

**Em arquivos CSS de componentes:**
```css
@import '../styles/variables.css';     /* Para usar --color-primary, etc */
```

**Em estilos compartilhados (Modal.css):**
```css
@import '../styles/variables.css';     /* Para acessar variáveis */
```

### 🎯 Benefícios da Nova Organização

✅ **Modularidade**: Cada componente tem seu próprio CSS
✅ **Manutenibilidade**: Fácil localizar e editar estilos específicos
✅ **Reutilização**: Estilos compartilhados centralizados
✅ **Escalabilidade**: Adicionar novos componentes é simples
✅ **Performance**: CSS pode ser separado por bundles se necessário
✅ **Consistência**: Variáveis centralizadas garantem coerência visual
✅ **Responsividade**: Media queries próximas aos estilos base

### 📝 Como Adicionar Novos Componentes

1. Criar arquivo `src/components/MeuComponente.tsx`
2. Criar arquivo `src/components/MeuComponente.css`
3. No arquivo CSS, importar variáveis se necessário:
   ```css
   @import '../styles/variables.css';
   ```
4. No componente, importar o CSS:
   ```tsx
   import './MeuComponente.css';
   ```
5. Se o componente usar modais, também importar:
   ```css
   @import '../styles/Modal.css';
   ```

### 🎨 Modificando Cores Globais

Para alterar a cor laranja do projeto, basta editar `src/styles/variables.css`:
```css
:root {
  --color-primary: #FF6B00;      /* Nova cor aqui */
  --color-primary-dark: #CC5500;
  --color-primary-light: #FF8533;
}
```

Todas as cores serão atualizadas automaticamente em todo o projeto.

### 📱 Media Queries

Estilos responsivos estão definidos em cada arquivo CSS específico do componente:
- **Mobile first**: Estilos base para mobile, depois `@media (max-width: 768px)`
- **Componente App**: Flexbox wrapping e padding ajustado
- **Componente RoundMatches**: Grid responsivo
- **Componentes Modal**: Max-width ajustado para viewport

---

**Estrutura atualizada em**: Novembro 13, 2025
**Versão**: 2.0 - CSS Reorganizado por Componente
