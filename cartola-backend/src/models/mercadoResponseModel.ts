import { Clube } from './clubeModel';
import { Posicao } from './posicaoModel';
import { Atleta } from './atletaModel';

export type MercadoResponse = {
  clubes: Record<string, Clube>;
  posicoes: Record<string, Posicao>;
  atletas: Atleta[];
};

export default MercadoResponse;
