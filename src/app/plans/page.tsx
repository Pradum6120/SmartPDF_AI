'use client'


import React from 'react'
import Box from '../components/Planbox/Box';

function page() {

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='flex h-[80%] w-[80%] flex-col justify-around items-center '>
        <h1>PRICING</h1>
        <Box title = "Basic" description = "Perfect for occasional use" price="₹49/month" p1="5 PDF summaries per month" p2="Standard processing speed" p3="Email Support"/>
        <Box title = "Pro" description = "For professionals and teams" price="₹99/month" p1="Unlimited PDF summaries" p2="Priority processing" p3="24/7 priority support"/> 
      </div>
    </div>
  )
}

export default page
