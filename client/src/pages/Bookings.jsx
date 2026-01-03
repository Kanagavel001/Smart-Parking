import React from 'react'
import moment from 'moment';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Bookings = () => {

  const { axios, user } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async (userId) => {
    try {
      const { data } = await axios.post('/api/user/bookings', {userId});
      if(data.success){
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    if(user){
      fetchBookings(user.id)
    }
  }, [user])

  return !isLoading ? (
    <div className='bg-bg md:pt-15 px-4 md:px-16 lg:px-24 xl:px-32 max-h-screen max-w-screen mx-auto overflow-x-hidden'>
      <h1 className='my-4 text-2xl font-bold'>Bookings</h1>

      <div className='flex flex-col gap-4 lg:w-4xl my-4 overflow-y-scroll h-140 no-scrollbar max-[450px]:text-sm border-2 border-primary p-4 rounded-lg shadow-lg shadow-primary/30  '>
        { bookings.map((item) => (
          <div className='flex items-center justify-between border-2 border-primary hover:shadow-lg shadow-secondary/10 py-1 px-4 rounded-lg transition-all duration-300' key={item._id}>

            <div className='border-2 border-primary w-fit p-1 rounded-full'>
              <img src="/Smart_parking.png" className='w-8' alt="" />
            </div>

            <div className='flex flex-col items-center'>
              <p>{item.floorName}</p>
              <p>{item.slotName} Slot</p>
            </div>

            <div className='flex flex-col items-center max-md:hidden'>
              <p>{moment(item.dateAndTime).format('DD MMM YYYY')}</p>
              <p>{moment(item.dateAndTime).format('hh:mm A')}</p>
            </div>

            <div className='flex flex-col items-center font-medium '>
              <p>{item.duration} Hours</p>
              <p>₹ {item.price}</p>
            </div>

            <div className='flex items-center font-medium'>
              <Link aria-disabled={item.paid} to={item.paymentLink} className={` px-4 py-0.5 rounded-lg transition-all duration-300 ${item.paid ? "border-2 text-primary border-primary cursor-not-allowed" : "text-white bg-secondary hover:scale-105 active:scale-95 hover:shadow-lg shadow-primary/30"}`}>{item.paid ? "Paid" : "Pay"}</Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Bookings