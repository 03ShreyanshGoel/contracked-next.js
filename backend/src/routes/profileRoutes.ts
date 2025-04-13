// backend/src/routes/profiles.ts
import express from 'express';
import { fetchProfile } from '../lib/profiles';

const router = express.Router();

router.get('/:platform/:userId', async (req, res) => {
    const { platform, userId } = req.params;

    try {
        const profile = await fetchProfile(platform, userId);
        res.json(profile);
    } catch (error: any) {
        res.status(404).json({ error: 'Failed to fetch profile', details: error.message });
    }
});

export default router;