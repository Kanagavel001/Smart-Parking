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
  const [isHome, setIsHome] = useState(false);
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  useEffect(()=>{
    if(location.pathname === '/login' || isAdminRoute){
      setCloseNav(true)
    }else if(location.pathname === '/') {
      setIsHome(true)
    }else{
      setIsHome(false)
      setCloseNav(false)
    }
  }, [location])

  return (
    <div>
      <ToastContainer 
        autoClose={3000}
      />
      {!closeNav && <Navbar isHome={isHome}/>}
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