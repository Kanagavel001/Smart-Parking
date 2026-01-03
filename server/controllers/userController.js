import Booking from "../models/Booking.js";

export const getUserBookings = async (req, res) => {
    try {
        const {userId} = req.body;
        const bookings = await Booking.find({user: userId}).sort({createdAt : -1});
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const isAdmin = async (req, res) => {
    res.json({success: true})
}