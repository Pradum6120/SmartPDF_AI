'use client'


import React from 'react'
import { useState } from 'react'

function page() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('0');
  const [currency] = useState('INR');

  const createOrderId = async () => {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseFloat(amount) * 100, currency }),
    });
    const data = await res.json();
    return data.orderId;
  };

  const processPayment = async ( ) => {
    console.log("working fine")
    const orderId = await createOrderId();

    const options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
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
    <div className='h-screen w-screen flex justify-center items-center'>
       <div>
        <button  onClick={()=> processPayment()} className='bg-blue-500  w-[200px] h-[40px] rounded-full'>
          click me to buy
        </button>
       </div>

       <div>
         <h1>Box 1</h1>
       </div>

       <div>
        <h1>Box 2</h1>
       </div>
    </div>
  )
}

export default page
