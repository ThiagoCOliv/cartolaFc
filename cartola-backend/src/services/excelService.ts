import path from 'path';
import fs from 'fs';
import ExcelJS from 'exceljs';
import { EstatisticasClube } from '../models/estatisticasClubeModel';

const DATA_PATH = path.resolve(__dirname, '../../data/Cartola.xlsx');

async function readRawEstatisticasRows(): Promise<Record<string, any>[]> {
  if (!fs.existsSync(DATA_PATH)) throw new Error(`Data file not found at ${DATA_PATH}`);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(DATA_PATH);

  let sheet = workbook.getWorksheet('Estatisticas dos times');
  if (!sheet) {
    sheet = workbook.worksheets[0];
    if (!sheet) return [];
  }

  const headerRow = sheet.getRow(1);
  const headers: string[] = [];
  headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    const txt: string = cell.text ? cell.text.trim().toLowerCase() : '';
    headers.push(txt.replaceAll(' ', '_') || `col_${colNumber}`);
  });

  const rows: Record<string, any>[] = [];
  sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return;

    const obj: Record<string, any> = {};
    headers.forEach((h, idx) => {
      const cell = row.getCell(idx + 1);
      let value: any = cell.value;

      if (value && typeof value === 'object') value = value.result;

      obj[h] = value ?? null;
    });

    rows.push(obj);
  });

  return rows;
}

function mapRawToEstatisticasClube(raw: Record<string, any>): EstatisticasClube {
  const toNumber = (v: any, fallback = 0) => {
    if (v === null || v === undefined || v === '') return fallback;
    const n = Number(v);
    return Number.isNaN(n) ? fallback : n;
  };

  const base: EstatisticasClube = {
    time: String(raw.time ?? ''),
    jogos: toNumber(raw.jogos),
    jogos_em_casa: toNumber(raw.jogos_em_casa),
    jogos_fora: toNumber(raw.jogos_fora),
    xg: toNumber(raw.xg),
    xg_contra: toNumber(raw.xg_contra),
    xg_casa: toNumber(raw.xg_casa),
    xg_fora: toNumber(raw.xg_fora),
    xg_contra_casa: toNumber(raw.xg_contra_casa),
    xg_contra_fora: toNumber(raw.xg_contra_fora),
    gols_pro: toNumber(raw.gols_pro),
    gols_contra: toNumber(raw.gols_contra),
    gols_pro_casa: toNumber(raw.gols_pro_casa),
    gols_pro_fora: toNumber(raw.gols_pro_fora),
    gols_contra_casa: toNumber(raw.gols_contra_casa),
    gols_contra_fora: toNumber(raw.gols_contra_fora),
    xg_medio: toNumber(raw.xg_medio),
    xg_medio_casa: toNumber(raw.xg_medio_casa),
    xg_medio_fora: toNumber(raw.xg_medio_fora),
    xg_medio_contra: toNumber(raw.xg_medio_contra),
    xg_medio_contra_casa: toNumber(raw.xg_medio_contra_casa),
    xg_medio_contra_fora: toNumber(raw.xg_medio_contra_fora),
    media_de_gols_pro: toNumber(raw.media_de_gols_pro),
    media_de_gols_pro_casa: toNumber(raw.media_de_gols_pro_casa),
    media_de_gols_pro_fora: toNumber(raw.media_de_gols_pro_fora),
    media_de_gols_contra: toNumber(raw.media_de_gols_contra),
    media_de_gols_contra_casa: toNumber(raw.media_de_gols_contra_casa),
    media_de_gols_contra_fora: toNumber(raw.media_de_gols_contra_fora),
    media_xg_pro_recente: toNumber(raw.media_xg_pro_recente),
    media_xg_contra_recente: toNumber(raw.media_xg_contra_recente),
    media_gols_pro_recente: toNumber(raw.media_gols_pro_recente),
    media_gols_contra_recente: toNumber(raw.media_gols_contra_recente),
  };

  return base;
}

export async function readEstatisticasTimes(): Promise<EstatisticasClube[]> {
  const raws = await readRawEstatisticasRows();
  return raws.map(r => mapRawToEstatisticasClube(r));
}

export function findRowByName(rows: any[], name?: string) {
  if (!name) return null;
  return rows.find(row => row.time === name) ?? null;
}