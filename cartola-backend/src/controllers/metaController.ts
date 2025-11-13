import { Request, Response } from 'express';
import { fetchMercado } from '../services/cartolaService';

export async function getMeta(req: Request, res: Response) {
  try {
    const data = await fetchMercado();
    res.json({ clubes: data.clubes, posicoes: data.posicoes });
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch meta' });
  }
}

export default getMeta;
