import Booking from "../models/Booking.js";
import Floor from "../models/Floor.js";
import stripe from 'stripe'


export const createOnspotBooking = async (req, res) => {
    try {
        const { car_number, duration, slotName, floorName, price } = req.body.bookingData;
        await Booking.create({
            car_number,
            duration,
            slotName,
            floorName,
            price,
            action: "Occupied"
        });
        await Floor.updateOne( { floorName, "slotsList.slotName": slotName }, { $set: { "slotsList.$.availability": "Occupied" } } );
        res.json({success: true, message: "Slot Booked Successfully"});
    } catch (error) {
        console.log('createOnspotBooking error', error.message);
        res.json({ success: false, message: error.message});
    }
}

export const createOnlineBooking = async (req, res) => {
    try {
        const { dateAndTime, duration, price, slotName, floorName } = req.body.bookingData;
        const { userId } = req.auth();
        const { origin } = req.headers;

        const booking = await Booking.create({
            user: userId,
            duration,
            slotName,
            floorName,
            price,
            dateAndTime,
            onlineBooking: true
        })
        await Floor.updateOne({floorName, "slotsList.slotName": slotName}, { $set: {"slotsList.$.availability": "Reserved"}})

        //Stripe initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // Create line items for Stripe
        const line_items = [{
            price_data: {
                currency: 'INR',
                product_data: {
                    name: slotName
                },
                unit_amount: Math.floor(price) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/bookings`,
            cancel_url: `${origin}/bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() /1000) + 60 * 60
        })

        booking.paymentLink = session.url;
        await booking.save();

        res.json({success: true, url: session.url});
    } catch (error) {
        console.log('createOnlineBooking error', error.message);
        res.json({ success: false, message: error.message});
    }
}

export const getOnlineBooking = async (req, res) => {
    try {
        const onlineBookings = await Booking.find({onlineBooking: true}).sort({dateAndTime: 1})
        res.json({success: true, onlineBookings });
    } catch (error) {
        console.log('getOnlineBooking error', error.message);
        res.json({ success: false, message: error.message});
    }
}

export const getOnspotBooking = async (req, res) => {
    try {
        const onspotBookings = await Booking.find({onlineBooking: false})
        res.json({success: true, onspotBookings });
    } catch (error) {
        console.log('getOnspotBooking error', error.message);
        res.json({ success: false, message: error.message});
    }
}

export const getSingleUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)
        const bookings = await Booking.find({user: userId})
        res.json({success: true, bookings });
    } catch (error) {
        console.log('getSingleUserBookings error', error.message);
        res.json({ success: false, message: error.message});
    }
}

export const changeBookingAction = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        const floorName = booking.floorName;
        const slotName = booking.slotName;

        if(booking.onlineBooking){

            if(booking.action === "Reserved"){
                booking.action = "Occupied";
                await Floor.updateOne({floorName, "slotsList.slotName": slotName}, { $set: {"slotsList.$.availability": "Occupied"}});
                booking.save();
                return res.json({success: true, message: "Slot is occupied successfully"});

            } else if(booking.action === "Occupied"){
                if(!booking.paid){
                    return res.json({success: false, message: "Payment is not completed"});
                }
                booking.action = "Completed";
                await Floor.updateOne({floorName, "slotsList.slotName": slotName}, { $set: {"slotsList.$.availability": "Available"}});
                booking.save();
                return res.json({success: true, message: "Parking is successfully Completed"});
            }
        }else{
            if(booking.action === "Occupied"){
                booking.action = "Completed";
                booking.paid = true;
                await Floor.updateOne({floorName, "slotsList.slotName": slotName}, { $set: {"slotsList.$.availability": "Available"}});
                booking.save();
                return res.json({success: true, message: "Parking is successfully Completed"});
            }
        }
    } catch (error) {
        console.log('changeBookingAction error', error.message);
        res.json({ success: false, message: error.message});
    }
}

export const getDashboardData = async (req, res) => {
    try {
        const onlineBookings = await Booking.find({onlineBooking: true});
        const onspotBookings = await Booking.find({onlineBooking: false});
        const floors = await Floor.find({});

        let available = 0, reserved = 0, occupied = 0;

        floors.forEach(floor => { 
            floor.slotsList.forEach(slot => { 
                if (slot.availability === "Available") { 
                    available++; 
                } else if (slot.availability === "Reserved") { 
                    reserved++; } else { 
                        occupied++; 
                    } 
                }); 
            });

        const dashboardData = {
            totalOnlineBookings: onlineBookings.length,
            totalOnspotBookings: onspotBookings.length,
            onlineBookingsRevenue: onlineBookings.reduce((acc, booking) => acc + booking.price, 0),
            onspotBookingsRevenue: onspotBookings.reduce((acc, booking) => acc + booking.price, 0),
            available,
            reserved,
            occupied 
        }
        res.json({success: true, dashboardData});
    } catch (error) {
        console.log('getDashboardData error', error.message);
        res.json({ success: false, message: error.message});
    } 
}