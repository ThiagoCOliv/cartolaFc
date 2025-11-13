import { Router } from 'express';
import { getMeta } from '../controllers/metaController';
import { getPlayers } from '../controllers/playersController';
import { getTopPlayers } from '../controllers/topPlayersController';
import { getPreviaRodada } from '../controllers/rodadaController';
import { getEstatisticasTimes } from '../controllers/estatisticasController';

const router = Router();

router.get('/meta', getMeta);
router.get('/players', getPlayers);
router.get('/players/top', getTopPlayers);
router.get('/previa-rodada', getPreviaRodada);
router.get('/data/estatisticas-times', getEstatisticasTimes);

export default router;