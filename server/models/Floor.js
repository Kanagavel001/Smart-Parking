import mongoose from 'mongoose'

const floorSchema = new mongoose.Schema({
    floorName: {type: String},
    slotsList: [{
        slotName: {type: String, required: true},
        availability: {type: String, enum: ['Available', 'Reserved', 'Occupied'], default: 'Available'}
    }],
    floorPrice: {type: Number, default: 99}
})

const Floor = mongoose.model('Floor', floorSchema);

export default Floor;