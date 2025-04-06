import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";


export default generatePDFSummeryFromGemini = (pdfText: string) => {

    if (!API_KEY) {
        throw new Error("Missing GOOGLE_GEMINI_API_KEY in environment variables.");
      }

      
      
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      export async function generateText(prompt: string): Promise<string> {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const result = await model.generateContent(prompt);
          return result.response.text();
        } catch (error) {
          console.error("Gemini API Error:", error);
          return "Error generating text.";
        }
      }
      

}





