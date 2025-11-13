export interface Clube {
  id: number;
  nome: string;
  abreviacao: string;
  apelido?: string;
  slug?: string;
  nome_fantasia?: string;
  escudos: {
    '30x30': string;
    '45x45': string;
    '60x60': string;
  };
  url_editoria: string;
}
