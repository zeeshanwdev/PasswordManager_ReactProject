import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="rounded-lg shadow-sm m-4">
    <div className="bg-gray-900 !w-full mx-auto !py-5 md:flex md:items-center md:justify-evenly fixed bottom-0">
      <span className="text-sm text-white sm:text-center">© 2024 <a href="_blank" className="hover:underline">Zeeshanwdev™</a> All Rights Reserved.</span>
    
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 dark:text-gray-400 sm:mt-0 gap-5">
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
    </ul>
    </div>
</footer>

    </div>
  )
}

export default Footer
