import React, { useState } from 'react'
import moment from 'moment'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const AdminBooking = () => {

  const { axios, isAdmin } = useAppContext()
  const [isOnlineBooking, setIsOnlineBooking] = useState(true);
  const [onlineBookings, setOnlineBookings] = useState([]);
  const [onspotBookings, setOnspotBookings] = useState([]);

  const fetchOnlineBookings = async () => {
    const { data } = await axios.get('/api/booking/get-online');
    if(data.success){
      setOnlineBookings(data.onlineBookings)
    }else{
      toast.error(data.message)
    }
  }

  const fetchOnspotBookings = async () => {
    
    const { data } = await axios.get('/api/booking/get-onspot');
    if(data.success){
      setOnspotBookings(data.onspotBookings)
    }else{
      toast.error(data.message)
    }
  }

  const changeAction = async (bookingId) => {
    if(!isAdmin){
      return toast.error("Admin only access")
    }
    const { data } = await axios.post('/api/booking/change-action', {bookingId})
    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }

  useEffect(()=>{
    fetchOnlineBookings();
    fetchOnspotBookings();
  }, [changeAction])

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Bookings</h1>

        <div className='flex gap-4'>
          <button onClick={()=>setIsOnlineBooking(true)} className={`border-2 border-primary py-1 px-2 rounded-lg text-primary font-medium transition-all duration-300 ${isOnlineBooking ? "bg-linear-to-l from-primary to-secondary text-white border-none" : "hover:scale-105 hover:shadow-lg shadow-primary/30 active:scale-100"}`}>Online Booking</button>
          <button onClick={()=>setIsOnlineBooking(false)} className={`border-2 border-primary py-1 px-2 rounded-lg text-primary font-medium transition-all duration-300 ${!isOnlineBooking ? "bg-linear-to-l from-primary to-secondary text-white" : "hover:scale-105 hover:shadow-lg shadow-primary/30 active:scale-100 cursor-pointer"}`}>Onspot Booking</button>
        </div>
      </div>

      <div className='max-w-4xl no-scrollbar mt-6 border border-primary rounded-lg'>
        {isOnlineBooking ? <table className='w-full rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-primary text-center text-white font-medium'>
              <th className='p-2 '>User Name</th>
              <th className='p-2 '>Floor & Slot Name</th>
              <th className='p-2 max-md:hidden'>Date & Time</th>
              <th className='p-2 '>Hours & Price</th>
              <th className='p-2 '>Action</th>
            </tr>
          </thead>
          <tbody className='bg-primary/10 text-center max-[450px]:text-sm'>
            {onlineBookings.map((item, i) => (
              <tr key={i} className='border-t border-primary'>
                <td className='p-2'>
                  <p>kanagavel</p>
                </td>
                <td className='p-2'>
                  <p>{item.floorName}</p>
                  <p>{item.slotName}</p>
                </td>
                <td className='p-2 max-md:hidden'>
                  <p>{moment(item.dateAndTime).format('DD MMM YYYY')}</p>
                  <p>{moment(item.dateAndTime).format('hh:mm A')}</p>
                </td>
                <td className='p-2'>
                  <p>{item.duration} hours</p>
                  <p>₹ {item.price}</p>
                </td>
                <td className='p-2 space-y-2 flex items-center flex-col'>
                  <p className={`px-2  rounded-full text-white ${item.action === "Reserved" ? "bg-orange-500" : item.action === "Occupied" ? "bg-red-600" : item.action === "Completed" ? "bg-secondary" : "bg-yellow-500"}`}>{item.action}</p>
                  <button disabled={item.action === "Completed"} onClick={()=>changeAction(item._id)} className={`border-2 px-4 py-0.5 rounded-lg border-primary text-primary transition-all duration-300  active:scale-95 ${item.action === "Reserved" ? "border-red-600 text-red-600 hover:shadow-lg hover:scale-105 shadow-red-600/30" : item.action === "Occupied" ? "border-primary text-primary hover:shadow-lg hover:scale-105 shadow-primary/30" : item.action === "Completed" ? "text-secondary border-secondary" : "hidden"}`}>{item.action === "Reserved" ? "Occupied" : item.action === "Occupied" ? "Complete" : "Completed"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        :
        <table className='w-full rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-primary text-center text-white font-medium'>
              <th className='p-2 '>Car Number</th>
              <th className='p-2 '>Floor & Slot Name</th>
              <th className='p-2 max-md:hidden'>Date & Time</th>
              <th className='p-2 '>Hours & Price</th>
              <th className='p-2 '>Action</th>
            </tr>
          </thead>
          <tbody className='bg-primary/10 text-center'>
            {onspotBookings.map((item, i) => (
              <tr key={i} className='border-t border-primary'>
                <td className='p-2'>
                  <p>{item.car_number}</p>
                </td>
                <td className='p-2'>
                  <p>{item.floorName}</p>
                  <p>{item.slotName}</p>
                </td>
                <td className='p-2 max-md:hidden'>
                  <p>{moment(item.createdAt).format('DD MMM YYYY')}</p>
                  <p>{moment(item.createdAt).format('hh:mm A')}</p>
                </td>
                <td className='p-2'>
                  <p>{item.duration} hours</p>
                  <p>₹ {item.price}</p>
                </td>
                <td className='p-2 space-y-2 flex items-center flex-col'>
                  <p className={`px-2  rounded-full text-white transition-all duration-300 ${item.action === "Occupied" ? "bg-red-600" : "bg-secondary"}`}>{item.action}</p>
                  <button disabled={item.action === "Completed"} onClick={()=>changeAction(item._id)} className={`border-2 px-4 py-0.5 rounded-lg transition-all duration-300 ${item.action === "Occupied" ? "border-primary text-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/50 active:scale-95" : "border-secondary text-secondary"}`}>{item.action === "Occupied" ? "Complete" : "Completed"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>  
        }
      </div>
    </div>
  )
}

export default AdminBooking