import Razorpay from "razorpay"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})


export async function POST(request: NextRequest){
    try {
        if(!currentUser){
           return NextResponse.json("UnAuthorized user")
        }

        const {amount} = await request.json();
        console.log("razorpay backend ", amount);

        const options = {
            amount: amount,
             currency: 'INR',
             receipt: 'rcp1',
        }
        // await connect to database here 

        const order = await razorpay.orders.create(options);
        console.log(order);
        return NextResponse.json({orderId: order.id}, {status: 200});


        // storing data in db



    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Something went wrong"},{status: 500})
    }
}
