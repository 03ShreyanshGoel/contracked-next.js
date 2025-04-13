// backend/src/routes/authRoutes.ts
import { Router, RequestHandler } from 'express';
import { authenticateUser, getUser } from '../controllers/authController';
import { ControllerHandler } from '../types';

const authRouter = Router();

const asyncAuthenticateUser: RequestHandler = async (req, res, next) => {
    try {
        await authenticateUser(req, res);
    } catch (error) {
        next(error);
    }
};

const asyncGetUser: RequestHandler = async (req, res, next) => {
    try {
        await getUser(req, res);
    } catch (error) {
        next(error);
    }
};

authRouter.post('/user', asyncAuthenticateUser);
authRouter.get('/user', asyncGetUser);

export default authRouter;