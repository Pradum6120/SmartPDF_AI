import Razorpay from "razorpay"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_Id
})


export async function POST(request: NextRequest){
    try {
        if(!currentUser){
           return NextResponse.json("UnAuthorized user")
        }

        const data = await request.json();
        // await connect to database here 

        const order = await razorpay.orders.create({
            amount: Math.round(500.0), // AMOUNT *100
            currency: "USD",
            reciept: 'recept-{Date.now()}',
            notes:{

            }

        })

        return NextResponse.json({orderId: order.id}, {status: 200})


        // storing data in db



    } catch (error) {
        console.log(error)
    }
}
