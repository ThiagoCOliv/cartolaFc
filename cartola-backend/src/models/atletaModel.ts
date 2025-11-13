import Clube from "./clubeModel";
import Posicao from "./posicaoModel";

export type Atleta = {
  atleta_id: number;
  apelido: string;
  nome?: string;
  clube?: Clube;
  posicao: Posicao;
  status_id: number;
  pontos_num?: number;
  preco_num?: number;
  media_num?: number;
  foto?: string;
};

export default Atleta;
