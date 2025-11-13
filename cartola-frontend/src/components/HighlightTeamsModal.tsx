import type { ExpectativaGeral } from '../interfaces';
import './HighlightTeamsModal.css';

interface HighlightTeamsModalProps {
  expectativaGeral: ExpectativaGeral | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HighlightTeamsModal({ expectativaGeral, isOpen, onClose }: HighlightTeamsModalProps) {
  if (!isOpen || !expectativaGeral) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content highlight-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <h3>Times Destaques da Rodada</h3>
        
        <div className="highlights-container">
          <div className="highlight-section">
            <h4>🔥 Ofensivas (Maior Potencial de Gols)</h4>
            <ul className="highlights-list">
              {expectativaGeral.ofensiva.map((time, index) => (
                <li key={index} className="highlight-item">
                  <span className="rank">#{index + 1}</span>
                  <span className="team-name">{time.time}</span>
                  <span className="points">{time.pontos} pts</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="highlight-section">
            <h4>🛡️ Defensivas (Maior Potencial de Defesa)</h4>
            <ul className="highlights-list">
              {expectativaGeral.defensiva.map((time, index) => (
                <li key={index} className="highlight-item">
                  <span className="rank">#{index + 1}</span>
                  <span className="team-name">{time.time}</span>
                  <span className="points">{time.pontos} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
