import type { Clube } from './Clube';
import type { Posicao } from './Posicao';

export interface Player {
  apelido: string;
  atleta_id: number;
  foto: string;
  nome: string;
  clube: Clube;
  posicao: Posicao;
  preco_num: number;
  media_num: number;
  pontos_num: number;
  status_id: number;
}
