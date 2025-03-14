import { Types } from 'mongoose';



export interface IPayment {
  order: Types.ObjectId;
  transactionId: string;
}
