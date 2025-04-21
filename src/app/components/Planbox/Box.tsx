'use client'

import React from 'react'
import { TiTickOutline } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from 'react';

function Box(props : {title : string, description : string, price : string, p1 : string, p2 : string, p3 : string}) {
     const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [amount, setAmount] = useState('0');
      const [currency] = useState('INR');

    const createOrderId = async (amount : string) => {
        const res = await fetch('/api/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: parseFloat(amount) * 100, currency }),
        });
        const data = await res.json();
        return data.orderId;
      };
    
      const processPayment = async ( amount : string) => {
        const orderId = await createOrderId(amount);
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: parseFloat(amount) * 100,
          currency,
          name: 'Test Name',
          description: 'Test Description',
          order_id: orderId,
          handler: async (response: any) => {
            const result = await fetch('/api/webhook/razorpay', {
              method: 'POST',
              body: JSON.stringify({
                orderCreationId: orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
              headers: { 'Content-Type': 'application/json' },
            });
            const res = await result.json();
            alert(res.isOk ? '✅ Payment Success' : res.message);
          },
          prefill: { name, email },
          theme: { color: '#3399cc' },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', (response: any) => alert(response.error.description));
        paymentObject.open();
      };
  return (
    <div className='w-[240px] h-[330px] border border-black rounded-2xl p-5 flex flex-col' >
               <h1 className='text-xl font-medium flex justify-start'>{props.title}</h1>
               <p>{props.description}</p>
               <h1 className='text-3xl font-bold mt-3'>{props.price}</h1>
               <div className='flex flex-col mt-4'>
               <p className='flex items-center gap-1 text-sm'><TiTickOutline />
                <span>{props.p1}</span></p>
                <p className='flex items-center gap-1 text-sm'><TiTickOutline /><span>{props.p2}</span></p>
                <p className='flex items-center gap-1 text-sm'><TiTickOutline /> <span>{props.p3}</span></p>
               </div>
                
               <button onClick={()=> processPayment("49")}   className='w-[120px] h-9 bg-red-300 rounded-3xl mt-6 flex justify-center items-center gap-2'>buy now</button>
            </div>
  )
}

export default Box
