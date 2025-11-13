export interface TimeDestaque {
  time: string;
  pontos: number;
}

export interface ExpectativaGeral {
  ofensiva: TimeDestaque[];
  defensiva: TimeDestaque[];
}
