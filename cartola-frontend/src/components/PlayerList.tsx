import { useState, useEffect } from 'react';
import type { Player, TimeInfo } from '../interfaces';
import { ClubModal } from './ClubModal';
import { Filters } from './Filters';
import './PlayerList.css';

export function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Player | 'isTopPlayer' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTimeInfo, setSelectedTimeInfo] = useState<TimeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topPlayerIds, setTopPlayerIds] = useState<number[]>([]);
  const [filterTopPlayersOnly, setFilterTopPlayersOnly] = useState(false);
  const [clubeFilter, setClubeFilter] = useState(0);
  const [posicaoFilter, setPosicaoFilter] = useState(0);

  const fetchPlayers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/players');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setPlayers(data.atletas);

      // Buscar melhores jogadores da rodada
      try {
        const topResponse = await fetch('http://localhost:3000/players/top');
        const topData = await topResponse.json();
        // Extrair IDs dos jogadores top (pode ser data ou data.atletas dependendo da resposta)
        const topIds = (topData.data || topData.atletas || topData)
          .map((player: any) => player.atleta_id || player.id)
          .filter(Boolean);
        setTopPlayerIds(topIds);
      } catch (topError) {
        console.error('Erro ao carregar melhores jogadores:', topError);
        // Continua mesmo se falhar
      }
    } catch (err) {
      console.error('Erro ao carregar jogadores:', err);
      setError('Erro ao carregar jogadores. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPlayers = players.filter(player => {
    const matchesClube = !clubeFilter || player.clube.id === clubeFilter;
    const matchesPosicao = !posicaoFilter || player.posicao.id === posicaoFilter;
    const matchesTopFilter = !filterTopPlayersOnly || topPlayerIds.includes(player.atleta_id);
    return matchesClube && matchesPosicao && matchesTopFilter;
  });

  // Função para ordenar os jogadores
  const handleSort = (column: keyof Player) => {
    if (sortColumn === column) {
      // Se clicou na mesma coluna, inverte a direção
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Se clicou em coluna diferente, começa com ascendente
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Aplicar ordenação aos jogadores filtrados
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (!sortColumn) return 0;

    // Tratamento especial para coluna de destaque
    if (sortColumn === 'isTopPlayer') {
      const aIsTop = topPlayerIds.includes(a.atleta_id);
      const bIsTop = topPlayerIds.includes(b.atleta_id);
      if (aIsTop === bIsTop) return 0;
      return sortDirection === 'asc' ? (aIsTop ? 1 : -1) : (aIsTop ? -1 : 1);
    }

    const aVal = a[sortColumn as keyof Player];
    const bVal = b[sortColumn as keyof Player];

    // Tratamento para strings (apelido, nome)
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    // Tratamento para números
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Tratamento para objetos (clube, posicao)
    if (typeof aVal === 'object' && typeof bVal === 'object' && aVal && bVal) {
      const aName = (aVal as any).nome || (aVal as any).apelido || '';
      const bName = (bVal as any).nome || (bVal as any).apelido || '';
      return sortDirection === 'asc'
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    }

    return 0;
  });

  // Função auxiliar para renderizar o indicador de ordenação
  const renderSortIndicator = (column: keyof Player | 'isTopPlayer') => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  const handleOpenClubModal = async (clubeId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/previa-rodada`);
      const data = await response.json();
      // Procura o time correspondente ao clube
      const matchWithClub = data.partidas.find((match: any) => 
        match.casa.time === players.find(p => p.clube?.id === clubeId)?.clube?.nome_fantasia ||
        match.visitante.time === players.find(p => p.clube?.id === clubeId)?.clube?.nome_fantasia
      );
      
      if (matchWithClub) {
        const timeInfo = matchWithClub.casa.time === players.find(p => p.clube?.id === clubeId)?.clube?.nome_fantasia 
          ? matchWithClub.casa 
          : matchWithClub.visitante;
        setSelectedTimeInfo(timeInfo);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Erro ao carregar informações do clube:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return (
      <div className="players-grid">
        <div className="player-card  no-results">
          <h3>{error}</h3>
          <p>
            Houve um problema ao buscar os jogadores. Verifique sua conexão
            ou tente novamente.
          </p>
          <button onClick={fetchPlayers} className="show-matches-btn">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (filteredPlayers.length === 0) {
    return (
      <div className="players-grid">
        <Filters
          onClubeFilter={setClubeFilter}
          onPosicaoFilter={setPosicaoFilter}
          clubeFilter={clubeFilter}
          posicaoFilter={posicaoFilter}
        />
        <div className="filter-top-players">
          <label>
            <input 
              type="checkbox" 
              checked={filterTopPlayersOnly} 
              onChange={(e) => setFilterTopPlayersOnly(e.target.checked)}
            />
            Mostrar apenas destaques da rodada
          </label>
        </div>
        <div className="player-card">
          <h3>Nenhum jogador encontrado</h3>
          <p>Não há jogadores que correspondam aos filtros aplicados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="players-container">
      <ClubModal 
        timeInfo={selectedTimeInfo} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Filters
        onClubeFilter={setClubeFilter}
        onPosicaoFilter={setPosicaoFilter}
        clubeFilter={clubeFilter}
        posicaoFilter={posicaoFilter}
      />
      <div className="players-grid">
        <div className="filter-top-players">
          <label>
            <input 
              type="checkbox" 
              checked={filterTopPlayersOnly} 
              onChange={(e) => setFilterTopPlayersOnly(e.target.checked)}
            />
            Mostrar apenas destaques da rodada
          </label>
        </div>
        <div className="players-info">
          <span className="player-count">
            Exibindo <strong>{sortedPlayers.length}</strong> de <strong>{players.length}</strong> jogadores
          </span>
        </div>
        <div className="players-table-wrapper">
          <table className="players-table">
            <thead>
              <tr>
                <th className="sortable stars-col" onClick={() => handleSort('isTopPlayer' as any)}>
                  ★ {renderSortIndicator('isTopPlayer')}
                </th>
                <th className="sortable" onClick={() => handleSort('apelido')}>
                  Nome {renderSortIndicator('apelido')}
                </th>
                <th className="sortable" onClick={() => handleSort('clube')}>
                  Clube {renderSortIndicator('clube')}
                </th>
                <th className="sortable" onClick={() => handleSort('posicao')}>
                  Posição {renderSortIndicator('posicao')}
                </th>
                <th className="sortable" onClick={() => handleSort('preco_num')}>
                  Preço {renderSortIndicator('preco_num')}
                </th>
                <th className="sortable" onClick={() => handleSort('media_num')}>
                  Média {renderSortIndicator('media_num')}
                </th>
                <th className="sortable" onClick={() => handleSort('pontos_num')}>
                  Pontos {renderSortIndicator('pontos_num')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map(player => (
                <tr key={player.atleta_id} className={`player-row ${topPlayerIds.includes(player.atleta_id) ? 'top-player' : ''}`}>
                  <td className="stars-cell">
                    {topPlayerIds.includes(player.atleta_id) ? '★' : ''}
                  </td>
                  <td className="player-name">
                    <div className="player-name-inner">
                      <div className="player-apelido">{player.apelido}</div>
                      {player.nome && <div className="player-nome">{player.nome}</div>}
                    </div>
                  </td>
                  <td className='player-clube'>
                    <div className="player-clube-inner" style={{ cursor: 'pointer' }} onClick={() => handleOpenClubModal(player.clube?.id)}>
                      <img src={player.clube?.escudos['30x30']} alt={player.clube?.nome_fantasia} />
                      {player.clube?.nome_fantasia || player.clube?.apelido || '-'}
                    </div>
                  </td>
                  <td>{player.posicao?.nome || '-'}</td>
                  <td>{typeof player.preco_num === 'number' ? `C$ ${player.preco_num.toFixed(2)}` : '-'}</td>
                  <td>{typeof player.media_num === 'number' ? player.media_num.toFixed(2) : '-'}</td>
                  <td>{typeof player.pontos_num === 'number' ? player.pontos_num : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}