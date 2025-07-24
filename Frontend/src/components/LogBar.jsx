import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";

function LogBar({ user , setShowProfile}) {

  return (
          <>
          {
            user ? 
            <div className='flex items-center gap-3 text-blue-600'>
              <CgProfile className='text-2xl' />
              <Link className='text-[18px] font-medium hover:text-blue-400 cursor-pointer hover:underline' to="/Profile"  >{user?.firstname} {user?.lastname}</Link>
            </div>
            :
            <div className='flex w-max items-center px-3 text-white gap-5'>
              <Link to="/Login" className='px-6 py-2 rounded-3xl bg-[#0497e5]'>Login</Link>
              <Link to="/Register" className='px-6 py-2 rounded-3xl bg-gray-300/50 text-black'>Get Start</Link>
            </div>
          }
          </>
  )
}

export default LogBar