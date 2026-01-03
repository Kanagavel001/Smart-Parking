import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col items-end justify-end pb-15 md:pb-20 px-6 md:px-16 lg:px-36 bg-[url("/home_bg.png")] bg-cover bg-center h-screen'>
      <h1 className='text-2xl md:text-4xl font-black'>Smart Parking Made Simple</h1>
      <h3 className='font-medium text-black/80'>Find, Reserve, and Park with Ease</h3>
      <p className='text-xs md:w-xl text-end mt-6 mb-4 text-black/90'>A smart parking solution that helps drivers locate available parking spaces in real time, reduce traffic congestion, and save time using modern web technology.</p>
      <Link to={'/parking'} className='flex gap-2 bg-linear-to-l to-secondary from-primary md:px-6 px-3 py-1 md:py-2  text-white rounded-full font-medium hover:scale-105 active:scale-95 hover:shadow-lg shadow-secondary/50 transition-all group duration-300'>Find Slot <ArrowRight className='group-hover:translate-x-1 transition-all duration-300'/></Link>
    </div>
  )
}

export default Home