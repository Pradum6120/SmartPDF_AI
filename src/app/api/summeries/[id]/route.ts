import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import pdfSummaryModel from "@/models/pdfModels";


export async function GET (context: { params: { id: string } } ){
    await connectToDatabase();
    try {
        const { id } = context.params;
        console.log("recieved id", id)
        const result = await pdfSummaryModel.findById(id) 
        if(!result){
            return NextResponse.json({ "message": "Document not found" }, { status: 404 })
        }
        
         return NextResponse.json(result)
    } catch (error) {
        console.error(error)
       return NextResponse.json({message :"something went wrong", error},{status: 500}); 
    }
   
     
}