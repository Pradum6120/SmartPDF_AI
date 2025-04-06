import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
    amount: number;
    status: string;
    stripe_payment_id: string;
    price_id?: string;
    user_email: string;
    created_at: Date;
    updated_at: Date;
}


const PaymentSchema = new Schema<IPayment>({
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    stripe_payment_id: { type: String, required: true },
    price_id: { type: String },
    user_email: { type: String, required: true },
},{timestamps: true})

const PaymentModel = (mongoose.models.Payment as mongoose.Model <IPayment>) || mongoose.model("Payment", PaymentSchema)

export default PaymentModel