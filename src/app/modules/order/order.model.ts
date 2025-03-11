/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { Medicine } from '../medicines/medicine.model';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Medicine',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        prescriptionLink: {
          type: String,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },

    shippingAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('validate', async function (next) {
  const order = this;

  let totalAmount = 0;

  for (const item of order.products) {
    const product = await Medicine.findById(item.product);

    if (!product) {
      return next(new Error(`Product not found!.`));
    }

    const productPrice = product.price;

    item.unitPrice = productPrice;
    const price = productPrice * item.quantity;

    totalAmount += price;
  }

  const isDhaka = order.shippingAddress.toLowerCase().includes('dhaka');
  const deliveryCharge = isDhaka ? 60 : 120;

  order.totalAmount = totalAmount;

  order.deliveryCharge = deliveryCharge;

  order.finalAmount = totalAmount + deliveryCharge;

  next();
});

export const Order = model<IOrder>('Order', orderSchema);
