import express from 'express';
import { changeBookingAction, createOnlineBooking, createOnspotBooking, getDashboardData, getOnlineBooking, getOnspotBooking, getSingleUserBookings } from '../controllers/bookingController.js';
import { protectUser } from '../middleware/protect.js';

const bookingRouter = express.Router();

bookingRouter.post('/onspot', createOnspotBooking);
bookingRouter.post('/online', protectUser, createOnlineBooking);
bookingRouter.get('/get-online', getOnlineBooking);
bookingRouter.get('/get-onspot', getOnspotBooking);
bookingRouter.get('/user', protectUser, getSingleUserBookings);
bookingRouter.post('/change-action', changeBookingAction);
bookingRouter.get('/get-dashboard-data', getDashboardData)

export default bookingRouter;