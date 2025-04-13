// backend/src/routes/bookmarkRoutes.ts
import { Router } from "express";
import { getUserBookmarks, toggleBookmark } from "../controllers/bookmarkController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/:id", (req, res, next) => {
    console.log(`[${new Date().toISOString()}] POST /api/bookmarks/${req.params.id} triggered`);
    next();
}, auth, toggleBookmark);

router.get("/", auth, getUserBookmarks);

export default router;