import mongoose from "mongoose";

export type TOrder = {
  _id:string,
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  
};