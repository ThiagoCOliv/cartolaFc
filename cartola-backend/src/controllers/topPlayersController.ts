import { Request, Response } from 'express';
import { buscarPreviaRodada, fetchMercado, fetchRodadaStatus, filterProvaveis } from '../services/cartolaService';
import { Atleta } from '../models/atletaModel';
import { mapAtletas } from '../mappers/atletaMapper';
import { getTopPlayersByRole } from '../helpers/topPlayersHelper';

export async function getTopPlayers(req: Request, res: Response) 
{
    try 
    {
        const posicao = req.query.posicao ? Number(req.query.posicao) : undefined;
        const data = await fetchMercado();

        let atletas: Atleta[] = await mapAtletas(data);
        atletas = filterProvaveis(atletas);

        const status = await fetchRodadaStatus();
        const rodadaAtual: number = status.rodada_atual;
        if (!rodadaAtual) return res.status(500).json({ error: 'could not determine current rodada from status' });
    
        const rodada = await buscarPreviaRodada(rodadaAtual);

        let offensiveTop: Atleta[] = [];
        let defensiveTop: Atleta[] = [];

        if(!posicao || posicao === 2 || posicao > 3) offensiveTop = await getTopPlayersByRole(rodada, atletas, 'ofensiva', posicao);
        if(!posicao || posicao === 6 || posicao < 4) defensiveTop = await getTopPlayersByRole(rodada, atletas, 'defensiva', posicao);

        const all = [...offensiveTop, ...defensiveTop];
        const unique = Array.from(new Map(all.map(a => [a.atleta_id, a])).values());
        
        res.json({ message: 'Melhores jogadores', data: unique });
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Erro ao obter os melhores jogadores' });
    }
}

export default getTopPlayers;