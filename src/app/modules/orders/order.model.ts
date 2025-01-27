import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';
import { Bicycle } from '../bicycles/bicycle.model';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Product reference is required'],
      ref: 'Bicycle',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
  },
  { timestamps: true },
);

orderSchema.pre('save', async function (next) {
  const order = this as TOrder;
  const product = await Bicycle.findById(order.product);

  if (!product) {
    return next(new Error('Status:404, Product not found'));
  }
  if (product.quantity < order.quantity) {
    return next(new Error('Insufficient stock for this product'));
  }
  product.quantity -= order.quantity;

  await product.save();

  next();
});

orderSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<TOrder>; // Get the update object
  const orderId = this.getQuery()._id; // Get the order being updated
  const newQuantity = update.quantity;

  if (newQuantity == null) {
    return next(); // If quantity isn't being updated, continue
  }

  const order = await this.model.findById(orderId);
  if (!order) {
    return next(new Error('Status:404, Order not found'));
  }

  const product = await Bicycle.findById(order.product);
  if (!product) {
    return next(new Error('Status:404, Product not found'));
  }

  // Adjust the stock based on the quantity change
  const quantityDifference = newQuantity - order.quantity;

  if (product.quantity < quantityDifference) {
    return next(new Error('Insufficient stock for this product'));
  }

  product.quantity -= quantityDifference;

  await product.save();

  next();
});

export const Order = model<TOrder>('Order', orderSchema);
