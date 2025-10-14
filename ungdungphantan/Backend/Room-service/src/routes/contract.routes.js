import expesss from 'express';
import { generateContract } from '../modules/contract.service.js';
const router = expesss.Router();
router.post('/', generateContract);
export default router;
