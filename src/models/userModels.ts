import mongoose, { Schema, Document } from "mongoose";

//Extends Document, meaning it behaves like a Mongoose document.
 export interface IUser extends  Document {
  email: string;
  full_name: string;
  customer_id?: string;
  price_id?: string;
  status?: string;
  created_at: Date;
  updated_at: Date;
 }


 const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  customer_id: { type: String },
  price_id: { type: String },
  status: { type: String, default: "active" },
 },{timestamps : true})



const UserModel = (mongoose.models.User as mongoose.Model<IUser>) ||  mongoose.model<IUser>("User", UserSchema);

export default UserModel