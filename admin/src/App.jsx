import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './context/AuthContext'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

function App() {

  const { token } = useAuth();

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login />
        : <>
          <Navbar />
          <hr className="h-[0.5px] border-0 bg-gray-200" />
          <div className='flex w-full'>
            <Sidebar />
            <main className="flex-1 px-3 py-1">
              <div className="flex-1 px-16 py-8">
                <Outlet />
              </div>
            </main>
          </div>
        </>
      }

    </div>
  )
}

export default App