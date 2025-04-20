"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummeryFromOpenAI } from "@/lib/openai";
import { generatePDFSummeryGemini } from "@/lib/gemini";
import { connectToDatabase } from "@/lib/db";
import pdfSummaryModel from "@/models/pdfModels";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface IUploadResponse {
  userId: string,
  file: {
    name: string,
    url: string,
  };
}

export default async function generatePDFSummery(uploadResponse: any[]) {

  if (!uploadResponse) {
    return {
      success: false,
      message: "No file uploaded",
      data: null,
    };
  }

  const firstFile = uploadResponse[0]; 
  const userId = firstFile?.serverData?.userId;
  const fileObject = firstFile?.serverData?.file;

  const fileName = fileObject?.name;
  const pdfUrl = fileObject?.ufsUrl;

  const nameOnly = fileName.replace(/\.pdf$/i, '');

  
  console.log("fileName",fileName);
  console.log("filename", nameOnly);




  if (!pdfUrl) {
    return {
      success: false,
      message: "No file uploaded/url",
      data: null,
    };
  }

  try {
    
    // Extract Pdf Using LangChain 
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("Extracted pdf text", pdfText)
   

    let summary;

    try {
      // Generating summary of pdf text using OpenAI
      summary = await generateSummeryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);

      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
         // Generating summary of odf using Gemini 
        try {
          summary = await generatePDFSummeryGemini(pdfText);
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI quota exceeded",
            geminiError
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "No summary generated",
        data: null,
      };
    }


    // save pdf to database

    try {
    await connectToDatabase() 
     const { userId } = await auth()
     console.log('userid typessss' , typeof(userId))

     if(!userId){
           return {
             success: false,
             message: "user not found"
           }
     }
     const NewSummary = new pdfSummaryModel ({

          user_id : userId,
          original_file_url: fileObject?.ufsUrl,
          summary_text: summary,
          status: "Completed",
          title: nameOnly, 
          file_name: fileName
     })

     await NewSummary.save()


    } catch (error) {
      console.error(error)
      return NextResponse.json({message:"Error while saving pdf in db"}, {status: 500})
    }
     
     

    return {
      success: true,
      message: "File uploaded successfully",
      data: { userId, fileName,nameOnly, summary },
    };
  } catch (err) {
    console.error("Error processing PDF:", err);
    return {
      success: false,
      message: "Error processing file",
      data: null,
    };
  }
}
