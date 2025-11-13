# Sistema de Temas - Cartola FC Frontend

## Visão Geral

Implementado um sistema completo de temas claro (light) e escuro (dark) com:
- ✅ Detecção automática da preferência do sistema operacional
- ✅ Persistência da escolha do usuário em localStorage
- ✅ Toggle interativo no header
- ✅ Transições suaves entre temas
- ✅ Suporte a todo o projeto

## 📁 Estrutura de Arquivos

```
src/
├── styles/
│   └── variables.css          # Variáveis de cor para light e dark
├── hooks/
│   └── useTheme.ts            # Hook customizado para gerenciar tema
└── components/
    ├── ThemeToggle.tsx        # Componente botão toggle
    ├── ThemeToggle.css        # Estilos do toggle
    └── App.tsx                # Integração do toggle no header
```

## 🎨 Variáveis de Tema

### Light Theme (Padrão)
```css
:root {
  --color-primary: #ff6b00;           /* Orange */
  --color-primary-dark: #cc5500;
  --color-primary-light: #ff8533;
  --color-secondary: #fab58d;
  --color-secondary-light: #7f8c8d;
  --color-background: #ffffff;        /* Branco */
  --color-text: #2c3e50;              /* Cinza escuro */
  --color-border: #e0e0e0;
  --color-surface: #f5f5f5;           /* Cinza muito claro */
}
```

### Dark Theme
```css
:root[data-theme="dark"] {
  --color-primary: #ff8533;           /* Orange mais claro */
  --color-primary-dark: #ff6b00;
  --color-primary-light: #ffb366;
  --color-secondary: #cc6b33;
  --color-secondary-light: #999999;
  --color-background: #1e1e1e;        /* Cinza escuro */
  --color-text: #e0e0e0;              /* Cinza claro */
  --color-border: #333333;
  --color-surface: #2a2a2a;           /* Cinza mais escuro */
}
```

## 🔧 Hook useTheme

Localização: `src/hooks/useTheme.ts`

### Funcionalidades

```typescript
const { theme, toggleTheme } = useTheme();

// theme: 'light' | 'dark' - tema atual
// toggleTheme: () => void - alterna entre temas
```

### Detecção Automática

1. **Verificar localStorage**: Se usuário já selecionou um tema, usar esse
2. **Verificar Sistema**: Se nenhuma preferência salva, detectar preferência do SO
3. **Padrão**: Light theme se nenhuma preferência for encontrada

### Armazenamento

- Salva a preferência do usuário em `localStorage` com chave `"theme"`
- Aplica o tema via atributo `data-theme` no elemento `<html>`
- Recarregar a página mantém o tema selecionado

## 🎛️ Componente ThemeToggle

Localização: `src/components/ThemeToggle.tsx`

### Uso

```tsx
import { ThemeToggle } from './components/ThemeToggle';

export function App() {
  return (
    <div>
      <ThemeToggle />
    </div>
  );
}
```

### Visual

- **Light**: 🌙 (Lua) em fundo claro
- **Dark**: ☀️ (Sol) em fundo escuro
- Transição de cor suave ao passar o mouse
- Tamanho responsivo (40px desktop, 36px mobile)
- Efeito de scale ao clicar

## 🎯 Integração no App

No `App.tsx`:

```tsx
<div className="header">
  <h1>Cartola FC - Prováveis</h1>
  <ThemeToggle />
</div>
```

O header usa flexbox para alinhar título e toggle:
- Desktop: lado a lado (space-between)
- Mobile: empilhados verticalmente

## 🌈 Transições

Todos os elementos têm transição suave (0.3s):

```css
transition: background-color 0.3s ease, color 0.3s ease;
```

Isso aplica a `html`, `body` e `#root` para garantir transição global.

## 📝 Como Adicionar Novos Elementos ao Tema

1. Definir a variável em `variables.css` para ambos os temas
2. Usar a variável no CSS:
   ```css
   background-color: var(--color-background);
   color: var(--color-text);
   ```
3. A transição será automática

## 🔍 Detecção de Preferência do Sistema

O hook usa a Media Query CSS:

```typescript
window.matchMedia('(prefers-color-scheme: dark)').matches
```

Isso respeita:
- Configurações de tela do sistema operacional
- Preferências de acessibilidade
- Hora do dia (alguns SOs)

## 💾 Armazenamento Persistente

Chave: `"theme"`
Valores possíveis: `"light"` | `"dark"`

Pode ser limpo via DevTools Console:
```javascript
localStorage.removeItem('theme');
```

## 🎨 Customização de Cores

Para modificar cores de um tema, editar `variables.css`:

```css
/* Light theme */
:root {
  --color-primary: #NOVA_COR;
}

/* Dark theme */
:root[data-theme="dark"] {
  --color-primary: #NOVA_COR_ESCURA;
}
```

Todas as componentes serão atualizadas automaticamente.

## 📱 Responsividade

- Toggle: 40px desktop → 36px mobile
- Header: Flex com wrap, adapta-se a qualquer tamanho
- Cores: Mantêm contraste em ambos os temas
- Scrollbar: Responde às variáveis de cor

## ♿ Acessibilidade

- `aria-label`: Descreve ação do botão
- `title`: Mostra dica ao passar o mouse
- Contraste: Atende WCAG AA em ambos os temas
- `color-scheme`: Ajuda browsers a renderizar elementos nativos corretamente

## 🧪 Testes Locais

No console do navegador:

```javascript
// Verificar tema atual
console.log(document.documentElement.getAttribute('data-theme'));

// Forçar tema (para testes)
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');

// Resetar
localStorage.removeItem('theme');
location.reload();
```

---

**Implementado em**: Novembro 11, 2025
**Versão**: 1.0
