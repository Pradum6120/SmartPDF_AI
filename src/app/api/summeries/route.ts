import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import pdfSummaryModel from "@/models/pdfModels";
import { auth } from "@clerk/nextjs/server";

export async function GET(){
   const { userId } = await auth();
   await connectToDatabase();

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const summaries = await pdfSummaryModel.find({ user_id: userId});

     return NextResponse.json(summaries);
}