import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <nav className='flex justify-between items-center p-2 lg:px-20 w-[93%] h-[55px] lg:h-[70px] lg:w-[80%] mx-auto border border-black '>
      <div>
        <h3 className=' text-blue-500  lg:text-3xl'>SmartPDF AI</h3>
      </div>
       
       <div className='flex gap-4'>
       <div>
       <Link href="/"><h4 className='text-xs hover:text-blue-400'>Home</h4></Link>
      </div>

      <div>
        <h4 className='text-xs'>Summeries</h4>
      </div>

      
       </div>
       <div>
        <Link href="/uploadpdf"><h4 className='text-xs hover:text-blue-400'>Uplaod Pdf</h4></Link>
        
      </div>

      <div className='border border-black h-8 w-8 rounded-full'>

      </div>
    </nav>
  )
}

export default Header
