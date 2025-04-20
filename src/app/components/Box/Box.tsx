import { VscFilePdf } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import { formatDistanceToNow } from 'date-fns'

 function Box({title, description, date}) {
  const firstLine = description.split("\n")[0]; // Just get the first line

  return (
    <div className='h-44 w-[500px] bg-amber-50 rounded-2xl border border-red-500 p-6 flex flex-col justify-between'>
      <div className='flex justify-between'>
        <h1> <span><VscFilePdf className='text-2xl' /></span>{title}</h1> 
        <MdDeleteOutline className='text-2xl' />
      </div>
      

      <div className='mt-3 font-light text-base'>
       <p>{firstLine}</p>
      </div>
      <div className='flex justify-between mt-3'>
      <p className='text-xs mt-1 font-serif'>{formatDistanceToNow(new Date(date),{addSuffix : true})}</p>
      <button className='text-green-500 h-6 w-[80px] bg-green-100 text-xs rounded-2xl'>Completed</button>
      </div>
      
      
    </div>
  )
}

export default Box
