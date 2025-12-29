



export const floorList = [ 
    { 
        floorName: '3rd Floor',
        slotsList: [
            {name: '3L1', availability: 'Available'}, 
            {name: '3R2', availability: 'Reserved'},
            {name: '3L3', availability: 'Available'},
            {name: '3R4', availability: 'Occupied'},
            {name: '3L5', availability: 'Reserved'},
            {name: '3R6', availability: 'Available'},
            {name: '3L7', availability: 'Reserved'},
            {name: '3R8', availability: 'Occupied'},
            {name: '3L9', availability: 'Available'},
            {name: '3L10', availability: 'Reserved'},
        ],
        floorPrice: 99
    },
    { 
        floorName: '2nd Floor',
        slotsList: [
            {name: '2L1', availability: 'Available'}, 
            {name: '2R2', availability: 'Reserved'},
            {name: '2L3', availability: 'Reserved'},
            {name: '2R4', availability: 'Occupied'},
            {name: '2L5', availability: 'Available'},
            {name: '2R6', availability: 'Occupied'},
            {name: '2L7', availability: 'Occupied'},
            {name: '2R8', availability: 'Reserved'},
            {name: '2L9', availability: 'Available'},
            {name: '2R10', availability: 'Reserved'},
        ],
        floorPrice: 99
    },
    { 
        floorName: '1st Floor',
        slotsList: [
            {name: '1L1', availability: 'Available'}, 
            {name: '1R2', availability: 'Reserved'},
            {name: '1L3', availability: 'Occupied'},
            {name: '1R4', availability: 'Occupied'},
            {name: '1L5', availability: 'Available'},
            {name: '1R6', availability: 'Reserved'},
            {name: '1L7', availability: 'Available'},
            {name: '1R8', availability: 'Reserved'},
            {name: '1L9', availability: 'Available'},
            {name: '1L10', availability: 'Reserved'},
        ],
        floorPrice: 99
    },
    { 
        floorName: 'Ground Floor',
        slotsList: [
            {name: 'GL1', availability: 'Available'}, 
            {name: 'GR2', availability: 'Reserved'},
            {name: 'GL3', availability: 'Occupied'},
            {name: 'GR4', availability: 'Occupied'},
            {name: 'GL5', availability: 'Available'},
            {name: 'GR6', availability: 'Available'},
            {name: 'GL7', availability: 'Reserved'},
            {name: 'GR8', availability: 'Reserved'},
            {name: 'GL9', availability: 'Available'},
            {name: 'GR10', availability: 'Reserved'},
        ],
        floorPrice: 99
    }
];

export const dummyBookingData = [
    {
        _id: '1',
        user_id: '1',
        car_number: 'TN 11 KD 143',
        slotName: '3L3',
        floorName: '3rd Floor',
        duration: 4,
        action: 'Completed',
        dateAndTime: 'Mon Dec 15 2025 14:30:00 GMT+0530 (India Standard Time)',
        price: 400
    },
    {
        _id: '2',
        user_id: '2',
        car_number: 'TN 11 KD 143',
        slotName: '3L3',
        floorName: '3rd Floor',
        duration: 4,
        action: 'Completed',
        dateAndTime: 'Mon Dec 15 2025 14:30:00 GMT+0530 (India Standard Time)',
        price: 400
    },
    {
        _id: '3',
        user_id: '3',
        car_number: 'TN 11 KD 143',
        slotName: '3L3',
        floorName: '3rd Floor',
        duration: 4,
        action: 'Completed',
        dateAndTime: 'Mon Dec 15 2025 14:30:00 GMT+0530 (India Standard Time)',
        price: 400
    }
]
