import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const generatedSignature = (orderId: string, paymentId: string) => {
  const keySecret = process.env.KEY_SECRET!;
  return crypto
    .createHmac('sha256', keySecret)
    .update(orderId + '|' + paymentId)
    .digest('hex');
};

export async function POST(request: NextRequest) {
  const { orderCreationId, razorpayPaymentId, razorpaySignature } = await request.json();

  const signature = generatedSignature(orderCreationId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return NextResponse.json({ message: 'payment verification failed', isOk: false }, { status: 400 });
  }

  return NextResponse.json({ message: 'payment verified successfully', isOk: true }, { status: 200 });
}