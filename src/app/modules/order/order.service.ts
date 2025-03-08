/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { IOrder } from './order.interface';
import { Medicine } from '../medicines/medicine.model';
import { Order } from './order.model';

import jwt from 'jsonwebtoken';
import config from '../../config';
import Stripe from 'stripe';

export const createOrder = async (
  medicineData: Partial<IOrder>,
  token: string,
) => {
  try {
    if (!token) {
      throw new Error('Authentication failed: No token provided.');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string);
    } catch (err) {
      throw new Error('Authentication failed: Invalid token.');
    }

    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      throw new Error('Authentication failed: Missing userId in token.');
    }

    const userId = decoded.userId; // Extract userId safely

    if (!medicineData.products || medicineData.products.length === 0) {
      throw new Error('No products in the order.');
    }

    // Check stock availability and update quantities
    for (const medicineItem of medicineData.products) {
      const product = await Medicine.findById(medicineItem.product);
      if (!product)
        throw new Error(`Product not found: ${medicineItem.product}`);
      if (product.quantity < medicineItem.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      // Atomically decrement stock
      await Medicine.findByIdAndUpdate(medicineItem.product, {
        $inc: { quantity: -medicineItem.quantity },
      });
    }

    // Create and save the order with user info
    const order = new Order({
      ...medicineData,
      user: userId, // Ensure userId is added
    });

    const createdOrder = await order.save();
    await createdOrder.populate('user products.product');

    return createdOrder;
  } catch (error: any) {
    console.error('Error creating order:', error.message);
    throw new Error('Order creation failed. Please try again.');
  }
};

if (!config.stripe_secret_key) {
  throw new Error('Stripe secret key is not defined');
}

const stripeClient = new Stripe(config.stripe_secret_key, {
  apiVersion: '2025-02-24.acacia',
});

const createPaymentIntentService = async (totalPrice: number) => {
  const amount = parseInt((totalPrice * 100).toString());

  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

const getAllOrders = async () => {};

const userOwnOrder = async (token: string, email: string) => {
  try {
    if (!token) {
      throw new Error('Authentication failed: No token provided.');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string);
    } catch (err) {
      throw new Error('Authentication failed: Invalid token.');
    }

    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      throw new Error('Authentication failed: Missing userId in token.');
    }

    const userId = decoded.userId;

    const result = await Order.find({ user: userId });

    return result;
  } catch (error: any) {
    console.error('Error fetching order:', error.message);
    throw new Error('Order fetch failed. Please try again.');
  }
};

export const OrderService = {
  createOrder,
  createPaymentIntentService,
  getAllOrders,
  userOwnOrder,
};
