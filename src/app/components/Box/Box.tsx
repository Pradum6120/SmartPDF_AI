import { VscFilePdf } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import { formatDistanceToNow } from 'date-fns'
import Link from "next/link";

 function Box({id, title, description, date}) {
  const firstLine = description.split("\n")[0]; // Just get the first line

  return (
    <Link href={`/summeries/${id}`}>
    <div className='h-52 w-[360px] lg:h-44 lg:w-[400px] bg-amber-50 rounded-2xl border border-red-500 p-6 flex flex-col justify-between'>
      <div className='flex justify-between'>
      <span className="text-xl lg:text-2xl"><VscFilePdf  /></span>
        <MdDeleteOutline className='text-2xl' />
      </div>
      <h1 className='break-words text-xl lg:text-2xl '>{title}</h1> 

      <div className='mt-3 font-light text-base'>
       <p>{firstLine}</p>
      </div>
      <div className='flex justify-between mt-3'>
      <p className='text-xs mt-1 font-serif'>{formatDistanceToNow(new Date(date),{addSuffix : true})}</p>
      <button className='text-green-500 h-6 w-[80px] bg-green-100 text-xs rounded-2xl'>Completed</button>
      </div>
      
      
    </div>
    </Link>
  )
}

export default Box
