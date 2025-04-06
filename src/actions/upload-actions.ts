"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummeryFromOpenAI } from "@/lib/openai";
//import { generatePDFSummeryFromGemini } from "@/lib/gemini"; // ✅ Ensure this is correctly imported

export default async function generatePDFSummery(uploadResponse: {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "No file uploaded",
      data: null,
    };
  }

  // ✅ Corrected destructuring (removed `[0]` since uploadResponse is an object)
  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse;

  if (!pdfUrl) {
    return {
      success: false,
      message: "No file uploaded",
      data: null,
    };
  }

  try {
    // ✅ Extract text from PDF
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText);

    let summary;

    try {
      // ✅ Generate summary using OpenAI
      summary = await generateSummeryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);

      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          // ✅ Fallback to Gemini AI if OpenAI fails
          //summary = await generatePDFSummeryFromGemini(pdfText);
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

    return {
      success: true,
      message: "File uploaded successfully",
      data: { userId, fileName, summary },
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
