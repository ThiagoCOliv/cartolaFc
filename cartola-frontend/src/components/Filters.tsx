import { useState, useEffect } from 'react';
import type { FiltersProps } from '../interfaces';
import './Filters.css';

export function Filters({ 
  onClubeFilter, 
  onPosicaoFilter,
  clubeFilter = 0,
  posicaoFilter = 0
}: FiltersProps) {
  const [clubes, setClubes] = useState<any[]>([]);
  const [posicoes] = useState<string[]>(["Goleiro","Lateral","Zagueiro","Meia","Atacante","Técnico"]);

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await fetch('http://localhost:3000/meta');
        const data = await response.json();
        setClubes(Object.values(data.clubes));
      } catch (error) {
        console.error('Erro ao carregar clubes:', error);
      }
    };

    fetchClubes();
  }, []);

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="clube">Clube:</label>
        <select
          id="clube"
          value={clubeFilter}
          onChange={(e) => onClubeFilter(Number(e.target.value))}
        >
          <option value="0">Todos os clubes</option>
          {clubes.map((clube) => (
            <option key={clube.id} value={clube.id}>
              {clube.nome_fantasia}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="posicao">Posição:</label>
        <select
          id="posicao"
          value={posicaoFilter}
          onChange={(e) => onPosicaoFilter(Number(e.target.value))}
        >
          <option value="0">Todas as posições</option>
          {posicoes.map((posicao, index) => (
            <option key={index + 1} value={index + 1}>
              {posicao}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}