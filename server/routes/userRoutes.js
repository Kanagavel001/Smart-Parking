import express from 'express'
import { getUserBookings, isAdmin } from '../controllers/userController.js';
import { protectAdmin } from '../middleware/protect.js';

const userRouter = express.Router();

userRouter.post('/is-admin', protectAdmin, isAdmin)
userRouter.post('/bookings', getUserBookings)

export default userRouter;