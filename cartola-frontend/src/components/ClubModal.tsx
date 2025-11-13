import type { TimeInfo } from '../interfaces';
import './ClubModal.css';

interface ClubModalProps {
  timeInfo: TimeInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ClubModal({ timeInfo, isOpen, onClose }: ClubModalProps) {
  if (!isOpen || !timeInfo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <img src={timeInfo.escudos['60x60']} alt={timeInfo.time} className="modal-shield" />
          <h2 className='team-name'>{timeInfo.time}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Expectativas</h3>
            <div className="modal-grid">
              <div className="modal-item">
                <span className="label">XG Esperado</span>
                <span className="value">{timeInfo.expectativa.xg_esperado.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">XG (Mando)</span>
                <span className="value">{timeInfo.expectativa.xg_esperado_mando.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">XG (Recente)</span>
                <span className="value">{timeInfo.expectativa.xg_esperado_recente.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Gols Esperados</span>
                <span className="value">{timeInfo.expectativa.gols_esperados.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Gols (Mando)</span>
                <span className="value">{timeInfo.expectativa.gols_esperados_mando.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Gols (Recente)</span>
                <span className="value">{timeInfo.expectativa.gols_esperados_recente.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Estatísticas Gerais</h3>
            <div className="modal-grid">
              <div className="modal-item">
                <span className="label">Jogos</span>
                <span className="value">{timeInfo.estatisticasTime.jogos}</span>
              </div>
              <div className="modal-item">
                <span className="label">Em Casa</span>
                <span className="value">{timeInfo.estatisticasTime.jogos_em_casa}</span>
              </div>
              <div className="modal-item">
                <span className="label">Fora</span>
                <span className="value">{timeInfo.estatisticasTime.jogos_fora}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Gols</h3>
            <div className="modal-grid">
              <div className="modal-item">
                <span className="label">Pró Total</span>
                <span className="value">{timeInfo.estatisticasTime.gols_pro}</span>
              </div>
              <div className="modal-item">
                <span className="label">Contra Total</span>
                <span className="value">{timeInfo.estatisticasTime.gols_contra}</span>
              </div>
              <div className="modal-item">
                <span className="label">Média Pró</span>
                <span className="value">{timeInfo.estatisticasTime.media_de_gols_pro.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Média Contra</span>
                <span className="value">{timeInfo.estatisticasTime.media_de_gols_contra.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Pró Recente</span>
                <span className="value">{timeInfo.estatisticasTime.media_gols_pro_recente.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Contra Recente</span>
                <span className="value">{timeInfo.estatisticasTime.media_gols_contra_recente.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Expected Goals (XG)</h3>
            <div className="modal-grid">
              <div className="modal-item">
                <span className="label">XG Total</span>
                <span className="value">{timeInfo.estatisticasTime.xg.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">XG Contra</span>
                <span className="value">{timeInfo.estatisticasTime.xg_contra.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Média XG Pró</span>
                <span className="value">{timeInfo.estatisticasTime.xg_medio.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">Média XG Contra</span>
                <span className="value">{timeInfo.estatisticasTime.xg_medio_contra.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">XG Pró Recente</span>
                <span className="value">{timeInfo.estatisticasTime.media_xg_pro_recente.toFixed(2)}</span>
              </div>
              <div className="modal-item">
                <span className="label">XG Contra Recente</span>
                <span className="value">{timeInfo.estatisticasTime.media_xg_contra_recente.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
