import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-20 w-[800px] justify-items-stretch text-green-600'>
      <NavLink to="/">
        Home
      </NavLink>


       <NavLink to="/paste">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
