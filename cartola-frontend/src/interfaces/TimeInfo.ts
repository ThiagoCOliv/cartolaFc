import type { EstatisticasTime } from './EstatisticasTime';
import type { Expectativa } from './Expectativa';

export interface TimeInfo {
  time: string;
  escudos: {
    '30x30': string;
    '45x45': string;
    '60x60': string;
  };
  estatisticasTime: EstatisticasTime;
  expectativa: Expectativa;
}
