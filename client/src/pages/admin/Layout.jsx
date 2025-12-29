import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div className='flex'>
        <AdminSidebar />
        <div className='flex-1 py-4 px-6 md:px-10 md:py-8 h-[calc(100vh)] overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout