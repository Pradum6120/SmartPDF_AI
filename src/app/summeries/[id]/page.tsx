import React from 'react'
import { connectToDatabase } from "@/lib/db";
import pdfSummaryModel from "@/models/pdfModels";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { MdDateRange } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import Link from 'next/link';


async function page(props:{ params : Promise<{id: string}>}) {
  
    const params = await props.params;
    const id = params.id

    const fetchSummmaryById = async()=> {
        try {
            await connectToDatabase();
            const res = await fetch(`api/summeries/${id}`);
            const data = await res.json();
            console.log("data coming from backend",data)
            if(!res.ok){
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error("something went wrong", error)
        }

    }

    fetchSummmaryById()

  return (
    <div>
      <div className='flex flex-col'>
      <div className='flex justify-end mt-6 p-2 w-[95%]' >
        <Link href={"/summeries"} className='text-black h-9 w-[150px] bg-red-100 text-[13px] font- rounded-2xl flex justify-center  items-center gap-1'><IoIosArrowBack /> <span>Back to Dashboard</span> </Link>
        </div>
        <div className='flex justify-around mt-2 p-3.5'>
        <h1 className='h-9 w-[130px] rounded-2xl border border-red-200 flex justify-center items-center'>✨ Ai Summary</h1>
        <h1 className='flex items-center gap-1 text-sm'> <MdDateRange /> 
        <span>January 29,2025</span>
        </h1>
        <h1 className='flex items-center gap-1 text-sm'><CiTimer />1 min read</h1>
        </div>
      </div>
       <h1 className='text-2xl text-center font-bold mt-1'>Pipe Network node Guide</h1>
       <div className='flex justify-center gap-4 mt-3'>
        <h1 className='flex items-center gap-1 text-sm'><FaExternalLinkAlt /><span>View Original</span></h1>
        <div className='bg-red-100 rounded-sm w-[170px] h-[30px] flex justify-center items-center'>
        <h1 className='flex items-center gap-1 text-sm'> <FaDownload /><span>Download Summary</span> </h1>
        </div>
        
       </div>
      <div className='p-6 border border-black w-[90%] h-[500px] mx-auto mt-5'>
       <h1>{id}</h1>
      </div>
    </div>
  )
}

export default page
