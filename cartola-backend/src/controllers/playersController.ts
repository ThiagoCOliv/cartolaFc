import { Request, Response } from 'express';
import { fetchMercado, filterProvaveis, applyFilters } from '../services/cartolaService';
import { Atleta } from '../models/atletaModel';
import { mapAtletas } from '../mappers/atletaMapper';

export async function getPlayers(req: Request, res: Response) {
  try {
    const posicao = req.query.posicao ? Number(req.query.posicao) : undefined;
    const clube = req.query.clube ? Number(req.query.clube) : undefined;

    const data = await fetchMercado();
    let atletas: Atleta[] = await mapAtletas(data);
    atletas = filterProvaveis(atletas);
    atletas = applyFilters(atletas, posicao, clube);

    res.json({ count: atletas.length, atletas });
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch players' });
  }
}

export default getPlayers;
