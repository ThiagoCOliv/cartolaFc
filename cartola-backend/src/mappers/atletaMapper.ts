import { Atleta } from '../models/atletaModel';
import Clube from '../models/clubeModel';
import MercadoResponse from '../models/mercadoResponseModel';
import Posicao from '../models/posicaoModel';
import { findClubById, findPosicaoById } from '../services/cartolaService';

export async function mapAtleta(raw: any, clubes: Record<string, Clube>, posicoes: Record<string, Posicao>): Promise<Atleta> {
  const clube = clubes[raw.clube_id] || await findClubById(raw.clube_id);
  const posicao = posicoes[raw.posicao_id] || await findPosicaoById(raw.posicao_id);
  return {
    atleta_id: raw.atleta_id,
    apelido: raw.apelido,
    clube,
    posicao,
    status_id: raw.status_id,
    pontos_num: raw.pontos_num,
    preco_num: raw.preco_num,
    media_num: raw.media_num,
    foto: raw.foto,
  };
}

export async function mapAtletas(raw: MercadoResponse): Promise<Atleta[]> {
  const promises = raw.atletas.map((r) => mapAtleta(r, raw.clubes, raw.posicoes));
  return Promise.all(promises);
}

export default mapAtletas;