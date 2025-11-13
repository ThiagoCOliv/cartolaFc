import { useState, useEffect } from 'react';
import type { Match, TimeInfo, ExpectativaGeral } from '../interfaces';
import { ClubModal } from './ClubModal';
import { HighlightTeamsModal } from './HighlightTeamsModal';
import './RoundMatches.css';

export function RoundMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeInfo, setSelectedTimeInfo] = useState<TimeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expectativaGeral, setExpectativaGeral] = useState<ExpectativaGeral | null>(null);
  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3000/previa-rodada');
        const data = await response.json();
        setMatches(data.partidas.filter((match: Match) => match.valida));
        if (data.expectativaGeral) {
          setExpectativaGeral(data.expectativaGeral);
        }
      } catch (error) {
        console.error('Erro ao carregar jogos da rodada:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div>Carregando jogos da rodada...</div>;
  }

  const handleOpenClubModal = (timeInfo: TimeInfo) => {
    setSelectedTimeInfo(timeInfo);
    setIsModalOpen(true);
  };

  return (
    <div className="matches-container">
      <ClubModal 
        timeInfo={selectedTimeInfo} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <HighlightTeamsModal 
        expectativaGeral={expectativaGeral}
        isOpen={isHighlightModalOpen}
        onClose={() => setIsHighlightModalOpen(false)}
      />
      <div className="matches-header">
        <h2>Jogos da Rodada</h2>
        {expectativaGeral && (
          <button 
            className="highlights-btn"
            onClick={() => setIsHighlightModalOpen(true)}
          >
            ⭐ Times Destaques
          </button>
        )}
      </div>
      <div className="matches-grid">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            <div className="match-teams">
              <span className="team home" style={{ cursor: 'pointer' }} onClick={() => handleOpenClubModal(match.casa)}>
                <img src={match.casa.escudos['30x30']} alt={match.casa.time} />
                {match.casa.time}
              </span>
              <span className="vs">x</span>
              <span className="team away" style={{ cursor: 'pointer' }} onClick={() => handleOpenClubModal(match.visitante)}>
                {match.visitante.time}
                <img src={match.visitante.escudos['30x30']} alt={match.visitante.time} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}