import React from 'react'
import { FileText } from 'lucide-react';
import { FilePen } from 'lucide-react';

function page() {
  return (
    <section>
      <div className='w-screen h-screen flex flex-col gap-3 justify-center relative'>
      <h1 className='text-blue-600 text-center text-6xl font-serif'> SmartPDF  </h1>
      <h1 className='text-black text-center text-3xl font-stretch-50%'> Powered By Ai</h1>
      <FileText className='absolute top-[10%] h-28 w-28 text-blue-700' />
      <FilePen className='absolute buttom-[-10%] h-28 w-28 text-red-700 hover: translate-4 hover:bg-amber-200' />
    </div>
    </section>
    
  )
}

export default page
