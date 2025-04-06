"use client"

import React from 'react'
import { useState } from 'react'
import UploadForm from '../components/ui/upload/upload-form'

function page() {
 const[form , setForm] = useState()

 const changeHandleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
      console.log(e)
 }
  return (
    <div>
      <UploadForm />
    </div>
  )
}

export default page
