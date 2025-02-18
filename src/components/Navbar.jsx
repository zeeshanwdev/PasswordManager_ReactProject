import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between !py-6 text-white w-[70%] !mx-auto'>
        <div className='font-bold text-lg flex items-center gap-1 max-w-full truncate'>
        <span className='hover:cursor-pointer text-sm sm:text-lg'>Password Manager</span>
        <span className="material-symbols-outlined text-green-400 text-sm sm:text-lg">vpn_key</span>
      </div>

        <ul className='flex gap-5 font-bold'>
            <li className='hover:cursor-pointer'>Home</li>
            <li className='hover:cursor-pointer'>About</li>
            <li className='hover:cursor-pointer'>ContactUs</li>
        </ul>
      
    </nav>
  )
}

export default Navbar
