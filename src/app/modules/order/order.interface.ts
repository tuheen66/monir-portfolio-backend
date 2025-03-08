import { Types, Document } from 'mongoose';


export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  prescriptionRequired?:string
  
}

export interface IOrder extends Document {
  user?: Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  deliveryCharge: number;
  finalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: string; 
    createdAt?: Date;
  updatedAt?: Date;
  
}
