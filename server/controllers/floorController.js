import Floor from "../models/Floor.js";


export const addSlot = async (req, res) => {
    try {
        const { floorName, slotName } = req.body.slotData;
        
        const floor = await Floor.findOne({floorName: floorName})

        if(floor){
            floor.slotsList.push({ slotName });
            await floor.save();
        }else{
            await Floor.create({
                floorName: floorName,
                slotsList: [{ slotName: slotName }]
            });
        }

        res.json({ success: true, message: 'Slot added Successfully'});
        
    } catch (error) {
        res.json({ success: false, message: error.message});
        console.log('addSlot error', error)
    }
}

export const getFloorData = async (req, res) => {
    try {
        const floorData = await Floor.find({});
        res.json({success: true, floorData});
    } catch (error) {
        console.log('getFloorData error', error.message);
        res.json({ success: false, message: error.message});
    }
}