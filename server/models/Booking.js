import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {type: String, ref: 'User'},
    car_number: {type: String},
    slotName: {type: String, required: true},
    floorName: {type: String, required: true},
    duration: {type: Number, required: true},
    action: {type: String, default: "Reserved", enum: ["Reserved", "Occupied", "Canceled", "Completed"]},
    paid: {type: Boolean, default: false},
    dateAndTime: {type: String},
    price: {type: Number, required: true},
    onlineBooking: {type: Boolean, default: false},
    paymentLink: {type: String}
}, {timestamps: true})

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;