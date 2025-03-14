import { Schema, model } from 'mongoose';

import { IPayment } from './payment.interface';

const PaymentSchema = new Schema<IPayment>(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    transactionId: { type: String },
  },
  { timestamps: true },
);

export const Payment = model<IPayment>('Payment', PaymentSchema);
