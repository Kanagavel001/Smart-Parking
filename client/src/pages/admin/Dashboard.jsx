import React, { useEffect, useState } from 'react'
import { Grid3x2, BookCheck, WifiPen  } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Dashboard = () => {

  const { axios } = useAppContext()
  const [dashboardData, setDashboardData] = useState([])

  const fetchDashboardData = async () => {
    const { data } = await axios.get('/api/booking/get-dashboard-data')
    if(data.success){
      setDashboardData(data.dashboardData)
    }else{
      toast.error(data.message)
    }
  }

  useEffect(()=>{
    fetchDashboardData()
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>

      <div className='my-8 flex flex-wrap gap-5 ml-8 items-center'>

        <div className='bg-primary/5 w-50 h-50 rounded-lg border-2 border-primary hover:shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-2.5'>
          <div className='my-2'><Grid3x2  className='size-10'/></div>
          <p className='text-xl font-medium my-1'>Slots</p>
          <div className='space-y-2 text-sm'>
            <p className='font-medium text-secondary border-2 border-secondary rounded-lg px-4'>Available: {dashboardData.available}</p>
            <p className='font-medium text-orange-600 border-2 border-orange-600 rounded-lg px-4'>Reserved: {dashboardData.reserved}</p>
            <p className='font-medium text-red-600 border-2 border-red-600 rounded-lg px-4'>Occupied: {dashboardData.occupied}</p>
          </div>
        </div>

        <div className='bg-primary/5 w-50 h-50 rounded-lg border-2 border-primary hover:shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-2.5'>
          <div className='my-2'><WifiPen   className='size-10'/></div>
          <p className='text-xl font-medium my-1'>Online Bookings</p>
          <div className='space-y-2 text-sm'>
            <p className='font-medium text-secondary border-2 border-secondary rounded-lg px-4'>Bookings: {dashboardData.totalOnlineBookings}</p>
            <p className='font-medium text-orange-600 border-2 border-orange-600 rounded-lg px-4'>Revenue: {dashboardData.onlineBookingsRevenue}</p>
          </div>
        </div>

        <div className='bg-primary/5 w-50 h-50 rounded-lg border-2 border-primary hover:shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-2.5'>
          <div className='my-2'><BookCheck   className='size-10'/></div>
          <p className='text-xl font-medium my-1'>Onspot Bookings</p>
          <div className='space-y-2 text-sm'>
            <p className='font-medium text-secondary border-2 border-secondary rounded-lg px-4'>Bookings: {dashboardData.totalOnspotBookings}</p>
            <p className='font-medium text-orange-600 border-2 border-orange-600 rounded-lg px-4'>Revenue: {dashboardData.onspotBookingsRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard