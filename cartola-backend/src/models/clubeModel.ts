export type Clube = {
  id: number;
  nome: string;
  abreviacao: string;
  apelido?: string;
  slug?: string;
  nome_fantasia?: string;
};

export function toClube(c: any): Clube {
  return {
    id: c.id,
    nome: c.nome,
    abreviacao: c.abreviacao,
    apelido: c.apelido,
    slug: c.slug,
    nome_fantasia: c.nome_fantasia,
  };
}

export default Clube;