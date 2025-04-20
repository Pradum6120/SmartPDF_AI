'use client'
import React from 'react'
import Link from 'next/link'
import Box from '../components/Box/Box'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

 function page(){
  
   const { isLoaded, isSignedIn } = useUser();
   const router = useRouter();
   const [summaries, setSummaries] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!isLoaded) return;
  
      if (!isSignedIn) {
        router.push('/login');
        return;
      }
  
      const fetchSummaries = async () => {
        try {
          const res = await fetch('api/summeries');
          const data = await res.json();
          console.log("got pdf summeries", data);
  
          if (!res.ok) {
            throw new Error(data.error || 'Something went wrong');
          }
  
          setSummaries(data);
        } catch (error) {
          console.error('Error fetching summaries:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSummaries();
    }, [isLoaded, isSignedIn, router]);
  
    if (loading) return <div className="p-6">Loading summaries...</div>;
  
 

  return (
    <div className=' h-screen w-screen'>

    
    <div className='flex justify-between items-start mt-11 p-6 mx-auto w-[80%]'>
     <div className=' flex flex-col gap-3'>
        <h1 className='text-4xl'>Your Summaries</h1>
        <p className='text-xl font-light leading-3'>Transform your PDFs Into concise actionable insights</p>
     </div>
     <div className='flex justify-center items-center'>
        <button className='h-[50px] w-[170px] bg-blue-100 rounded-2xl'> <span className='text-2xl'> +  </span>     New Summary</button>


     </div>
    </div>

    <div className='w-[60%] bg-amber-100 mx-auto mt-2 h-12 border border-amber-400 rounded-xl p-2 flex justify-center items-center '>
       <h3>You've reached limit of 5 uploads on the Basic plan. <Link href={"/"} className='font-bold'>Click here to upgrade to Pro -> </Link>For unlimited uploads</h3>
    </div>
    <div className='p-5  w-[60%] gap-6 flex flex-wrap justify-around items-center mt-4'>
      {summaries.map((summarie)=><Box title ={summarie.title}  description = {summarie.summary_text}  date = {summarie.updatedAt}/>)}
    
    
    </div>
     
    </div>
  )
}

export default page
