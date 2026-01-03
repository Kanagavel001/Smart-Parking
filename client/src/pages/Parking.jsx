import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarClock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';


const Parking = () => {

  const { floorData, fetchFloorData, axios, getToken } = useAppContext();

  const [selectedFloor, setSelectedFloor] = useState({ floorName: "", slotsList: [] });
  const [selectedDateAndTime, setSelectedDateAndTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('')
  const [duration, setDuration] = useState('')

  const selectSlot =  (slot) => {
    if(slot.availability === 'Available'){
      setSelectedSlot(slot)
    }else{
      setSelectedSlot('')
      toast('Select Green Slot', { type: 'error'})
    }
  }

  const handleBookSlot = async (e) => {
    e.preventDefault()
    const bookingData = {
      slotName: selectedSlot.slotName,
      floorName: selectedFloor.floorName,
      price: selectedFloor.floorPrice * duration,
      dateAndTime: selectedDateAndTime,
      duration
    }
    const token = await getToken();
    console.log(token)
    const { data } = await axios.post('/api/booking/online', {bookingData}, {headers: {Authorization: `Bearer ${token}`}});

    if(data.success){
      window.location.href = data.url;
      setDuration('');
      setSelectedDateAndTime('');
      setSelectedSlot('')
    }else{
      toast.error(data.message)
    }
  }

useEffect(() => {
  fetchFloorData();
  const updatedFloor = floorData.find( f => f.floorName === selectedFloor.floorName );
      if (updatedFloor) { setSelectedFloor(updatedFloor); }
}, [handleBookSlot]);

useEffect(() => {
  if (floorData.length > 0 && !selectedFloor.floorName) {
    const groundFloor = floorData.find(floor => floor.floorName === "Ground Floor");
    setSelectedFloor(groundFloor || floorData[0]);
  }
}, [floorData]);

  return (
    <div className='bg-bg md:pt-15 pt-12 px-4 md:px-16 lg:px-24 xl:px-32 max-w-screen max-h-screen mx-auto overflow-x-hidden'>

      <div className='flex items-center justify-around sm:my-6 my-2'>

        {/* Floor List */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-4'>
          {floorData.map((item, i) => (
            <button key={i} onClick={()=>{setSelectedFloor(item); console.log(selectedFloor)}} className={`text-white bg-linear-to-l from-primary to-secondary hover:to-secondary hover:from-primary rounded-lg font-medium py-1 px-2 sm:py-2 sm:px-4 cursor-pointer  transition-all duration-300 ${selectedFloor.floorName === item.floorName ? "scale-105 from-primary to-secondary " : "from-primary/90 to-secondary/90 hover:scale-105 active:scale-100"}`}>
                {item.floorName}
              </button>
          ))}
        </div>

        {/* Select Date */}
        <form onSubmit={handleBookSlot} className='flex items-center border-2 border-primary rounded-lg p-2 shadow-lg shadow-primary/30 max-lg:flex-col gap-2 w-fit max-[450px]:w-45 max-[450px]:text-sm'>

          <label htmlFor="date" className='border-2 flex max-[450px]:px-0.5 px-2 py-1 border-primary rounded-lg'>
            <DatePicker
              required
              className='outline-none w-40 max-[450px]:w-35 font-medium'
              id='date'
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="dd/MM/yyyy h:mm aa"
              showTimeSelect
              selected={selectedDateAndTime}
              onChange={(date) => setSelectedDateAndTime(date)}
              placeholderText="Date & Time"
              minDate={new Date()}
            />
            <CalendarClock />
          </label>

          <div className='flex items-center gap-2'>
            
              <input 
                onChange={(e)=>setDuration(e.target.value)}
                value={duration}
                required
                max={24}
                id='duration'
                type="number"
                className='outline-none border-2 px-2 py-1 border-primary rounded-lg font-medium w-20'
                placeholder='Hours ?'
              />
            
            <div className='w-20 px-2 py-1 border-2 border-primary rounded-lg font-medium'>₹ {selectedFloor.floorPrice} / h</div>
          </div>

          <button disabled={!selectedSlot} type='submit' className={`border-2 text-primary border-primary py-1 px-4 rounded-full font-medium transition-all duration-300 ${selectedSlot && "hover:scale-105 hover:shadow-lg shadow-primary/50 active:scale-100 text-white bg-linear-to-l to-primary from-secondary"}`}>Book Now</button>
        </form>
      </div>

      {/* Slot List */}
      <div className='flex flex-col items-center my-2 lg:mt-8'>
        <div className='grid grid-cols-2 gap-2 lg:gap-4 gap-x-10 md:gap-x-20 lg:gap-x-40'>
            {selectedFloor.slotsList.map((item) => (
              <div onClick={()=>selectSlot(item)} className={`w-31 max-[450px]:w-25 relative transition-all duration-300  ${item.availability === 'Available' && "hover:scale-105 hover:shadow-lg shadow-primary active:scale-95"}`} key={item.slotName}>
                <img className={`${item.slotName === selectedSlot.slotName && "invert-20"} `} src={item.availability === 'Occupied' ? '/occupied_slot.png' : item.availability === 'Reserved' ? '/reserved_slot.png' : 'available_slot.png' } alt="" />
                <p className='font-bold text-white text-lg max-[450px]:text-sm absolute top-3 right-3'>{item.slotName}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Parking