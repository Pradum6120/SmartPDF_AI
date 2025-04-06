import mongoose, { Schema, Document } from "mongoose";


export interface IPdfSummary extends Document {
       user_id : string,
       original_file_url: string,
       summary_text: string,
       status?: string,
       title: string,
       file_name: string,
       created_at: Date,
       updated_at: Date,
}


const PdfSummarySchema = new Schema<IPdfSummary>({
   user_id : {
      type : String,
      required: true

   },
   original_file_url: { type: String, required: true },
   summary_text: { type: String, required: true },
   status: { type: String, default: "pending" },
   title: { type: String, required: true },
   file_name: { type: String, required: true },


},{timestamps: true})



const pdfSummaryModel = mongoose.models.PdfSummary as mongoose.Model<IPdfSummary> || mongoose.model<IPdfSummary>("PdfSummary" ,PdfSummarySchema)


export default  pdfSummaryModel

