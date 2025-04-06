import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/actions/prompts";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API !)


export const generatePDFSummeryGemini = async (pdfText: string) => {
  try {
    console.log("now opening gimini to summarize pdf")
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `${SUMMARY_SYSTEM_PROMPT}\n\n${pdfText}`
    );

    const geminiResponse = await result.response;
    console.log("Your Summery", geminiResponse.text())
    return geminiResponse.text();
  } catch (error) {
    console.error("Unable to generate summary using Gemini", error);
    throw new Error("GEMINI_FAILED"); // 👈 Make it throw so fallback logic can catch this
  }
};
