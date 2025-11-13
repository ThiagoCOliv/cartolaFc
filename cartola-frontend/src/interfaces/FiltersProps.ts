export interface FiltersProps {
  onClubeFilter: (clube: number) => void;
  onPosicaoFilter: (posicao: number) => void;
  clubeFilter?: number;
  posicaoFilter?: number;
}
