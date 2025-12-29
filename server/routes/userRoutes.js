import express from 'express'
import { protectUser } from '../middleware/protect.js';
import { isUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/is-user', protectUser, isUser)

export default userRouter;