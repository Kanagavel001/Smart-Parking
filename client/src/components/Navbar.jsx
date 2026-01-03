import React, { useState } from 'react'
import { Menu, TicketPlus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useAppContext } from '../context/AppContext';


const Navbar = ({isHome}) => {

    const [openMenu, setOpenMenu] = useState(false);
    const { navigate, user } = useAppContext();

    const navLinks = [
        {title: 'Home', path: '/'},
        {title: 'Parking', path: '/parking'},
        {title: 'Admin', path: '/admin'},
    ]

  return (
    <div className={`fixed top-0 left-0 z-50 w-full ${isHome ? "bg-transparent" : "bg-linear-to-l to-primary from-secondary"} px-4 md:px-16 lg:px-24 xl:px-32 flex justify-between items-center h-18 max-sm:h-12 transition-all duration-300`}>

        <div>
            <img onClick={()=>navigate('/')} className={`w-25 ${isHome && "invert"}`} src="/logo.png" alt="" />
        </div>

        {/* Desktop */}
        <div className='flex items-center gap-10 max-sm:hidden'>
            <div className='flex items-center gap-8 text-white'>
                {navLinks.map((item, i) => (
                    <Link key={i} to={item.path} className='font-medium group cursor-pointer '>{item.title}<div className='bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300'></div></Link>
                ))}
            </div>
            <div>
                {!user ? <button onClick={()=>navigate('/login')} className='text-white bg-linear-to-l from-primary/90 hover:to-secondary hover:from-primary to-secondary/90 py-1.5 px-6 rounded-full font-medium hover:shadow-lg shadow-primary/50 active:scale-95 transition-all duration-300'>Login</button>
                :
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/bookings')} />
                    </UserButton.MenuItems>
                </UserButton>}
            </div>
            

        </div>

        <div className='flex items-center gap-4 sm:hidden'>
            {user ? <UserButton>
                <UserButton.MenuItems>
                    <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/bookings')} />
                </UserButton.MenuItems>
            </UserButton>
            :
            <button onClick={()=>{navigate('/login'); setOpenMenu(false)}} className='text-white bg-linear-to-l from-primary to-secondary py-1 px-4 rounded-full font-medium active:scale-95 transition-all duration-300'>Login</button>}
            <Menu className='text-white' onClick={()=>setOpenMenu(true)}/>
        </div>


        {/* Mobile */}
        <div className={`fixed sm:hidden bg-white z-50 top-0 left-0 w-full h-12 flex justify-center transition-all duration-300 ${openMenu ? "translate-y-0 shadow-lg shadow-primary/50" : "-translate-y-full"}`}>
            <div className='flex items-center gap-4 font-medium'>
                {navLinks.map((item, i) => (
                    <div key={i} className='cursor-pointer text-sm' onClick={()=>{navigate(item.path); setOpenMenu(false)}}>{item.title}</div>
                ))}
            </div>
            <div onClick={()=>setOpenMenu(false)} className=' absolute top-3 right-4'>
                <X strokeWidth={3}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar