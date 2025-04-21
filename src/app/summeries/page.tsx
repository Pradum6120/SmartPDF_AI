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
    <div className='min-h-screen lg:h-screen :lg:w-screen'>

    
    <div className='flex justify-between items-start mt-5 lg:mt-11 p-6 mx-auto w-screen'>
      <div className='flex justify-around gap-2 w-[100%]'>
     <div className=' flex flex-col gap-3 w-[60%]'>
        <h1 className='text-[25px] font-bold lg:text-4xl'>Your Summaries</h1>
     </div>
     <div className='flex justify-center items-center w-[30%]'>
        <button className=' h-[30px] w-[130px] text-xs rounded-sm lg:h-[50px] lg:w-[170px] bg-blue-100 lg:rounded-2xl font-sans'> + New Summary</button>
     </div> 
     </div> 
    </div>

    <div className='w-[82%] h-8 p-6 lg:w-[60%] lg:h-12 bg-amber-100 mx-auto mt-2 border border-amber-400 rounded-xl lg:p-2 flex flex-col justify-center items-center '>
       <h3 className='text-xs'>You've reached limit of 5 uploads on the Basic plan.</h3>
          <Link href={"/"} className='font-bold text-xs'> Click here to upgrade to Pro -> <span className='font-normal'>For unlimited uploads</span></Link> 
    </div>
   <div className='p-5  gap-6 flex flex-wrap justify-around items-center mt-4'>
      {summaries.map((summarie)=><Box   id = {summarie._id}   title ={summarie.title}  description = {summarie.summary_text}  date = {summarie.updatedAt}/>)}
    
    
    </div>

     
    </div>
  )
}

export default page
