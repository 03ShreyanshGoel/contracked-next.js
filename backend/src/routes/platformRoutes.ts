import express, { RequestHandler, Response } from 'express';
import { AuthRequest } from '../middleware/auth'; // From your auth.ts
import { auth } from '../middleware/auth';
import { getUserPlatforms, updateUserPlatform, deleteUserPlatform } from '../controllers/platformController';
import { Platform } from '@prisma/client';

const router = express.Router();

// Get all platforms for a user
const getPlatforms: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const platforms = await getUserPlatforms(userId);
        res.json(platforms);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

// Update or create a platform handle
const postPlatform: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { platform, handle } = req.body as { platform: Platform; handle: string };
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!platform || !handle) {
            res.status(400).json({ error: 'Platform and handle are required' });
            return;
        }
        const updated = await updateUserPlatform(userId, platform, handle);
        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

// Delete a platform
const deletePlatform: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { platform } = req.params as { platform: string };
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const validPlatforms = Object.values(Platform);
        if (!validPlatforms.includes(platform as Platform)) {
            res.status(400).json({ error: 'Invalid platform' });
            return;
        }
        const result = await deleteUserPlatform(userId, platform as Platform);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

router.get('/', auth, getPlatforms);
router.post('/', auth, postPlatform);
router.delete('/:platform', auth, deletePlatform);

export default router;