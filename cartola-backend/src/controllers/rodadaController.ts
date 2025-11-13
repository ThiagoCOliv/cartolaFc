import { Request, Response } from 'express';
import { fetchRodadaStatus, buscarPreviaRodada } from '../services/cartolaService';

export async function getPreviaRodada(req: Request, res: Response) {
  try {
    const status = await fetchRodadaStatus();
    const rodadaAtual: number = status.rodada_atual;
    if (!rodadaAtual) return res.status(500).json({ error: 'could not determine current rodada from status' });

    const rodada = await buscarPreviaRodada(rodadaAtual);
    
    res.json(rodada);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch rodada partidas. ' + err });
  }
}

export default getPreviaRodada;
