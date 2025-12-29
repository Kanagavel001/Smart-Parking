import React from 'react'
import { LayoutDashboard, SquareParking, BookMarked  } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {

  const { navigate } = useAppContext();

  const navLinks =  [
    { title : "Dashboard", path: '/admin', icon: LayoutDashboard  },
    { title : "Parking", path: '/admin/parking', icon: SquareParking },
    { title : "Bookings", path: '/admin/booking', icon: BookMarked  },
  ]

  return (
    <div className='border-r border-primary/50 max-sm:w-auto w-60 py-2 min-h-screen'>

      <div className='flex justify-center'>
        <img onClick={()=>navigate('/')} src="/logo.png" className='w-35 max-sm:hidden' alt="" />
        <img onClick={()=>navigate('/')} src="/Smart_parking.png" className='w-10 sm:hidden' alt="" />
      </div>

      <div className='py-4 space-y-2'>
        {navLinks.map((item, i) => (
          <NavLink key={i} end to={item.path} className={({isActive}) => `flex relative p-2 px-4 space-x-2 font-bold hover:bg-primary/30 ${isActive ? "bg-primary/20" : "hover:bg-primary/20"} transition-all duration-300`}>
            {({isActive}) => (
              <>
                <item.icon className={`${isActive && "text-primary"}`}/>
                <h1 className={`max-sm:hidden ${isActive && "text-primary"}`}>{item.title}</h1>
                <span className={`w-2 absolute h-full top-0 right-0 ${isActive && "bg-primary"}`}></span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar