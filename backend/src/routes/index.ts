import { Router } from 'express';
import authRoutes from './authRoutes';
import contestRoutes from './contestRoutes';
import bookmarkRoutes from './bookmarkRoutes';
import profileRoutes from './profileRoutes';
import platformRoutes from './platformRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contests', contestRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/profiles', profileRoutes);
router.use('/user/platforms', platformRoutes);

export default router;