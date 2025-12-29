import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Parking from './pages/Parking'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Bookings from './pages/Bookings'
 import { ToastContainer } from 'react-toastify';
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AdminParking from './pages/admin/AdminParking'
import AdminBooking from './pages/admin/AdminBooking'
import Loading from './components/Loading'

const App = () => {

  const location = useLocation();

  const [closeNav, setCloseNav] = useState(false);

  useEffect(()=>{
    if(location.pathname === '/login' || location.pathname === '/admin' || location.pathname === '/admin/parking' || location.pathname === '/admin/booking'){
      setCloseNav(true)
    }else{
      setCloseNav(false)
    }
  }, [location])

  return (
    <div>
      <ToastContainer 
        autoClose={3000}
      />
      {!closeNav && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/parking' element={<Parking />}/>
        <Route path='/bookings' element={<Bookings />}/>
        <Route path='/loading/:nextUrl' element={<Loading />}/>
        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='parking' element={<AdminParking />}/>
          <Route path='booking' element={<AdminBooking />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App