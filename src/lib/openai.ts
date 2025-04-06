import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/actions/prompts";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  
});

export async function generateSummeryFromOpenAI(pdfText: string) {
    try{
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: SUMMARY_SYSTEM_PROMPT },
            { role: "user", content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText} ` },
           
        ],
        temperature: 0.7,
        max_tokens: 1500
    });
    return response.choices[0].message.content;
} catch(error: any){
    console.log("openai failed")
    if(error?.status === 429){
       throw new Error('RATE_LIMIT_EXCEEDED')
    }
   throw error;
} 

}