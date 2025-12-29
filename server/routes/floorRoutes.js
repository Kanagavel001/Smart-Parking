import express from 'express';
import { addSlot, getFloorData } from '../controllers/floorController.js';

const floorRouter = express.Router();

floorRouter.post('/add-slot', addSlot);
floorRouter.get('/get', getFloorData);

export default floorRouter;