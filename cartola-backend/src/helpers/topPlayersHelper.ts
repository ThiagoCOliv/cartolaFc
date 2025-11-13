import { applyFilters, buscarPreviaRodada, findClubByName } from '../services/cartolaService';
import { Atleta } from '../models/atletaModel';

export async function getTopPlayersByRole(
  rodada: any,
  atletas: Atleta[],
  role: string,
  posicao?: number
): Promise<Atleta[]> 
{
    let topAtletas: Atleta[] = [];
    const expectativaList: any[] = rodada?.expectativaGeral?.[role];

    if (posicao)
    {
        const topPlayersByPosition = await getTopPlayersByPosition(atletas, posicao, expectativaList);
        topAtletas.push(...topPlayersByPosition);
    } 
    else 
    {
        const posicoes = role === 'ofensiva' ? [2, 4, 5, 6] : [1, 2, 3, 6];

        for (const pos of posicoes) 
        {
            const topPlayersByPosition = await getTopPlayersByPosition(atletas, pos, expectativaList);
            topAtletas.push(...topPlayersByPosition);
        }
    }

  const map = new Map<number, Atleta>();
  for (const a of topAtletas) if (a && a.atleta_id != null) map.set(a.atleta_id, a);
  return Array.from(map.values());
}

export async function getTopPlayersByPosition(
  atletas: Atleta[],
  posicao: number,
  expectativaList: any[]
): Promise<Atleta[]> 
{
    const topAtletas: Atleta[] = [];

    const filteredAtletas = applyFilters(atletas, posicao, undefined);
    const ordenedAtletas = filteredAtletas.sort((a, b) => (b.media_num ?? 0) - (a.media_num ?? 0));
    topAtletas.push(...ordenedAtletas.slice(0, 5));

    const clubes = await Promise.all(expectativaList.map(t => findClubByName(t.time)));

    for (const clube of clubes) 
    {
        if (!clube) continue;
        const destaques = ordenedAtletas.filter(atleta => atleta.clube?.id === clube.id);
        topAtletas.push(...destaques);
    }

    return topAtletas;
}