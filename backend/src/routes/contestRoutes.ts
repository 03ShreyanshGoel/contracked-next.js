import { Router } from 'express';
import { getContests, updateSolutionLink } from '../controllers/contestController';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

const router = Router();

router.get('/', getContests);
router.put('/:contestId/solution', auth, admin, updateSolutionLink);

export default router;