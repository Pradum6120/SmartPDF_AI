 import { connectToDatabase } from "@/lib/db";
 import pdfSummaryModel from "@/models/pdfModels";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export default async function SummaryPage (props:{ params : Promise<{id: string}>}) {

    const params = await props.params;
    const id = params.id

    
   const getSummaryById = async ()=> {
    try {

        await connectToDatabase()
        const summary = await pdfSummaryModel.findOne({id})
        if( !summary ){
            notFound()
        }
        return NextResponse.json({ summary : summary
        })
        
    } catch (error) {
        console.error("Error fetching summary by id", error)
    }

   }


   return <div> Summary page {id} </div>
}