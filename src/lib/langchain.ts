import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  console.log("response", fileUrl)
  const response = await fetch(fileUrl);
 
  const blob = await response.blob();
  console.log("blob", blob)
  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));
   const docs = await loader.load();
   return docs.map((doc)=> doc.pageContent).join('\n');
}
