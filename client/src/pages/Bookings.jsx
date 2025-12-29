import React from 'react'
import moment from 'moment';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Bookings = () => {

  const { axios, getToken, user } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/booking/user', {headers: {Authorization: `Bearer ${token}`}});
      if(data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user){
      fetchBookings();
    }
  }, [user])

  return (
    <div className='bg-bg px-4 md:px-16 lg:px-24 xl:px-32 max-h-screen max-w-screen mx-auto overflow-x-hidden'>
      <h1 className='my-4 text-2xl font-bold'>Bookings</h1>

      {bookings.length > 0 ? <div className='flex flex-col gap-4 lg:w-4xl my-4 overflow-y-scroll h-140 no-scrollbar max-[450px]:text-sm border-2 border-secondary p-4 rounded-lg shadow-inner shadow-secondary/30  '>
        { bookings.map((item) => (
          <div className='flex items-center justify-between border-2 border-primary hover:shadow-lg shadow-secondary/10 py-1 px-4 rounded-lg transition-all duration-300' key={item._id}>

            <div className='border-2 border-primary w-fit p-1 rounded-full'>
              <img src="/Smart_parking.png" className='w-8' alt="" />
            </div>

            <div className='flex flex-col items-center'>
              <p>{item.floorName}</p>
              <p>{item.slotName} Slot</p>
            </div>

            <div className='flex flex-col items-center'>
              <p>{moment(item.dateAndTime).format('DD MMM YYYY')}</p>
              <p>{moment(item.dateAndTime).format('hh:mm A')}</p>
            </div>

            <div className='flex flex-col items-center font-medium'>
              <p>{item.duration} Hours</p>
              <p>₹ {item.price}</p>
            </div>

          </div>
        ))}
      </div> : 
      <div>No Bookings</div>
      }
    </div>
  )
}

export default Bookings