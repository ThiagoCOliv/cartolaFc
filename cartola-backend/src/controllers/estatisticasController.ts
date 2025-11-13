import { Request, Response } from 'express';
import { readEstatisticasTimes } from '../services/excelService';

export async function getEstatisticasTimes(req: Request, res: Response) {
  try {
    const rows = await readEstatisticasTimes();
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'falha ao ler dados dos times' });
  }
}

export default getEstatisticasTimes;
