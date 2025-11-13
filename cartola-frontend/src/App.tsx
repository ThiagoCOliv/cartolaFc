import { useState } from 'react'
import { PlayerList } from './components/PlayerList'
import { RoundMatches } from './components/RoundMatches'
import { ThemeToggle } from './components/ThemeToggle'
import './components/App.css'

function App() {
  const [showMatches, setShowMatches] = useState(false);

  return (
    <div className="container">
      <div className="header">
        <h1>Cartola FC - Prováveis</h1>
        <ThemeToggle />
      </div>
      
      <div className="controls">
        <button
          className="show-matches-btn"
          onClick={() => setShowMatches(!showMatches)}
        >
          {showMatches ? 'Voltar para Jogadores' : 'Ver Jogos da Rodada'}
        </button>
      </div>

      {showMatches ? (
        <RoundMatches />
      ) : (
        <PlayerList/>
      )}
    </div>
  )
}

export default App
