import { EstatisticasClube } from "../models/estatisticasClubeModel";

export function ajustarExpectativas(clube: EstatisticasClube, adversario: EstatisticasClube, escudos: any, isAway: boolean) {
  if (!clube || !adversario) return;

  const { time, ...estatisticasTime } = clube;

  const expectativa = {
    xg_esperado: estatisticasTime.xg_medio * adversario.xg_medio_contra,
    xg_esperado_mando: estatisticasTime.xg_medio_casa * adversario.xg_medio_contra_fora,
    xg_esperado_recente: estatisticasTime.media_xg_pro_recente * adversario.media_xg_contra_recente,
    gols_esperados: estatisticasTime.media_de_gols_pro * adversario.media_de_gols_contra,
    gols_esperados_mando: estatisticasTime.media_de_gols_pro_casa * adversario.media_de_gols_contra_fora,
    gols_esperados_recente: estatisticasTime.media_gols_pro_recente * adversario.media_gols_contra_recente
  };

  if (isAway) {
    expectativa.xg_esperado_mando = estatisticasTime.xg_medio_fora * adversario.xg_medio_contra_casa;
    expectativa.gols_esperados_mando = estatisticasTime.media_de_gols_pro_fora * adversario.media_de_gols_contra_casa;
  }

  return {
    time,
    escudos,
    estatisticasTime,
    expectativa
  };
}