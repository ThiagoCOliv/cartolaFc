import api from './apiClient';
import { MercadoResponse } from '../models/mercadoResponseModel';
import { Atleta } from '../models/atletaModel';
import dotenv from 'dotenv';
import EstatisticasClube from '../models/estatisticasClubeModel';
import { findRowByName, readEstatisticasTimes } from './excelService';
import { ajustarExpectativas } from '../helpers/ajustarExpectativas';
import { calcularExpectativaGeral } from '../helpers/calcularExpectativaGeral';
import { Clube, toClube } from '../models/clubeModel';
import Posicao from '../models/posicaoModel';

dotenv.config();

export async function fetchMercado(): Promise<MercadoResponse> {
  const resp = await api.get(`/atletas/mercado`);
  return resp.data as MercadoResponse;
}

export async function fetchRodadaStatus(): Promise<any> {
  const resp = await api.get(`/mercado/status`);
  return resp.data;
}

export async function fetchPartidas(rodada: number): Promise<any> {
  const resp = await api.get(`/partidas/${rodada}`);
  const data = resp.data;

  const clubesMap: Record<string, any> = {};
  if (data && data.clubes) {
    if (Array.isArray(data.clubes)) {
      for (const clube of data.clubes) {
        const id = String(clube.id);
        if (id) clubesMap[id] = clube;
      }
    } else {
      for (const [k, v] of Object.entries(data.clubes)) {
        clubesMap[String(k)] = v;
      }
    }
  }

  const partidasArr = data.partidas || [];

  const normalizeTeamNameFromPartida = (p: any, keyCandidates: string[]) => {
    for (const k of keyCandidates) {
      if (k in p && p[k]) return String(p[k]);
    }
    return '';
  };

  const matches = partidasArr.map((partida: any) => {
    const casaId = partida.clube_casa_id;
    const visitaId = partida.clube_visitante_id;

    let casaName = '';
    let visitaName = '';

    if (casaId && String(casaId) in clubesMap) casaName = clubesMap[String(casaId)].nome_fantasia;
    if (visitaId && String(visitaId) in clubesMap) visitaName = clubesMap[String(visitaId)].nome_fantasia;

    if (!casaName) casaName = normalizeTeamNameFromPartida(partida, ['clube_casa', 'clube_casa_nome', 'nome_casa', 'nome_time_casa', 'time_casa']);
    if (!visitaName) visitaName = normalizeTeamNameFromPartida(partida, ['clube_visitante', 'clube_visitante_nome', 'nome_visitante', 'nome_time_visitante', 'time_visitante']);

    return {
      casa: { time: casaName, escudos: clubesMap[String(casaId)].escudos },
      visitante: { time: visitaName, escudos: clubesMap[String(visitaId)].escudos },
      valida: partida.valida,
    };
  });

  return { rodada, partidas: matches };
}

export function filterProvaveis(atletas: Atleta[]): Atleta[] {
  return atletas.filter((a) => a.status_id === 7);
}

export async function findClubByName(name: string): Promise<Clube | undefined> {
  const mercado = await fetchMercado();
  const clubes = mercado.clubes;
  const clube = Object.values(clubes).find((c: Clube) => c.nome_fantasia === name);
  return clube;
}

export async function findClubById(id: number): Promise<Clube> {
  const mercado = await fetchMercado();
  const clubes = mercado.clubes;
  const clube = Object.values(clubes).find((c: Clube) => c.id === id);
  return toClube(clube);
}

export async function findPosicaoById(id: number): Promise<Posicao> {
  const mercado = await fetchMercado();
  const posicoes = mercado.posicoes;
  const posicao = Object.values(posicoes).find((p: Posicao) => p.id === id);
  return posicao!;
}

export function applyFilters(atletas: Atleta[], posicao_id?: number, clube_id?: number): Atleta[] {
  let result = atletas;
  if (posicao_id) result = result.filter((a) => a.posicao.id === posicao_id);
  if (clube_id) result = result.filter((a) => a.clube!.id === clube_id);
  return result;
}

export async function buscarPreviaRodada(rodadaAtual: number){
  let rodada = await fetchPartidas(rodadaAtual);
  const estatisticasTimes: EstatisticasClube[] = await readEstatisticasTimes();

  rodada.partidas = rodada.partidas.map((partida: any) => {
    let rawCasa: EstatisticasClube = findRowByName(estatisticasTimes, partida.casa.time);
    let rawVisitante: EstatisticasClube = findRowByName(estatisticasTimes, partida.visitante.time);

    const casa = ajustarExpectativas(rawCasa, rawVisitante, partida.casa.escudos, false) || rawCasa;
    const visitante = ajustarExpectativas(rawVisitante, rawCasa, partida.visitante.escudos, true) || rawVisitante;

    return {
      ...partida,
      casa,
      visitante,
    };
  });

  rodada.expectativaGeral = calcularExpectativaGeral(rodada.partidas);

  return rodada;
}