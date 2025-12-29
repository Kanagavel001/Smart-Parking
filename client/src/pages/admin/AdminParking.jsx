import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { CirclePlus } from 'lucide-react';
import AddSlot from '../../components/AddSlot';
import { useAppContext } from '../../context/AppContext';

const AdminParking = () => {

  const { floorData, axios, fetchFloorData } = useAppContext();

  const [selectedFloor, setSelectedFloor] = useState({ floorName: "", slotsList: [] });
  const [selectedSlot, setSelectedSlot] = useState({})
  const [carNumber, setCarNumber] = useState('')
  const [duration, setDuration] = useState('')
  const [openAddSlot, setOpenAddSlot] = useState(false);
  
  const selectSlot =  (slot) => {
    if(slot.availability === 'Available'){
      setSelectedSlot(slot)
    }else{
      setSelectedSlot('')
      toast('Select Green Slot', { type: 'error'})
    }
  }

  const handleBookSlot =  async (e) => {
    e.preventDefault();
    const bookingData = {
      car_number: carNumber,
      duration,
      slotName: selectedSlot.slotName,
      floorName: selectedFloor.floorName,
      price: selectedFloor.floorPrice * duration
    }
    const { data } = await axios.post('/api/booking/onspot', {bookingData});
    if(data.success){
      toast.success(data.message);
      setSelectedSlot({})
      setCarNumber('');
      setDuration('')
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
    <div className=' relative'>

      {openAddSlot && <div className=' z-50 absolute flex items-center justify-center w-full min-h-full bg-white'>
        <AddSlot setOpenAddSlot={setOpenAddSlot}/>
      </div>}

      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Parking Slots</h1>
        <button onClick={()=>setOpenAddSlot(true)} className='flex  items-center text-primary gap-2 border-2 border-primary py-1 px-2 rounded-lg hover:shadow-lg shadow-primary/30 hover:scale-105 active:scale-100 transition-all duration-300'><CirclePlus width={20} />Add Slot</button>
      </div>
      

      <div className='flex max-lg:flex-col items-center justify-around'>

        <div className='flex flex-col items-center my-6 lg:mt-8'>
          <div className='grid grid-cols-2 gap-2 lg:gap-4 gap-x-10 md:gap-x-20 lg:gap-x-40'>
              {selectedFloor?.slotsList?.map((item) => (
                <div onClick={()=>selectSlot(item)} className={`w-31 max-[450px]:w-25 relative transition-all duration-300  ${item.availability === 'Available' && "hover:scale-105 hover:shadow-lg shadow-primary active:scale-95"}`} key={item.slotName}>
                  <img className={`${item.slotName === selectedSlot.slotName && "invert-20"} `} src={item.availability === 'Occupied' ? '/occupied_slot.png' : item.availability === 'Reserved' ? '/reserved_slot.png' : '/available_slot.png' } alt="" />
                  <p className='font-bold text-white text-lg max-[450px]:text-sm absolute top-3 right-3'>{item.slotName}</p>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h1 className='font-medium text-lg text-center'>Book a Slot</h1>
          <div className='flex justify-between items-center gap-6 py-4'>
            <div className='flex flex-col gap-1'>
              {floorData.map((item, i) => (
                <button key={i} onClick={()=>setSelectedFloor(item)} className={`text-white bg-linear-to-l from-primary to-secondary hover:to-secondary hover:from-primary rounded-lg font-medium py-1 px-2 sm:py-2 sm:px-4 cursor-pointer  transition-all duration-300 ${selectedFloor.floorName === item.floorName ? "scale-105 from-primary to-secondary " : "from-primary/90 to-secondary/90 hover:scale-105 active:scale-100"}`}>
                  {item.floorName}
                </button>
              ))}
            </div>
          
            <form onSubmit={handleBookSlot} className='flex flex-col gap-2 max-[400px]:w-30'>
              <input className='outline-none border-2 border-primary rounded-lg py-1 px-2 ' type="text" placeholder='Car Number' required value={carNumber} onChange={(e)=>setCarNumber(e.target.value)}/>
              <input className='outline-none border-2 border-primary rounded-lg py-1 px-2 ' type="number" placeholder='Hours ?' required value={duration} onChange={(e)=>setDuration(e.target.value)}/>
              <button disabled={!selectedSlot} type='submit' className={`border-2 text-primary border-primary py-1 px-4 rounded-full font-medium transition-all duration-300 ${selectedSlot && "hover:scale-105 hover:shadow-lg shadow-primary/50 active:scale-100 text-white bg-linear-to-l to-primary from-secondary"}`}>Book Slot</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminParking