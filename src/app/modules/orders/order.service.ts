import Stripe from 'stripe';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import config from '../../config';

const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);

  return result;
};

if (!config.stripe_secret_key) {
  throw new Error('Stripe secret key is not defined');
}

const stripeClient = new Stripe(config.stripe_secret_key, {
  apiVersion: '2025-01-27.acacia',
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

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

const customerOwnOrder = async (email: string) => {
  const result = await Order.find({ email });
  return result;
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const updateOrder = async (id: string, data: TOrder) => {
  const result = await Order.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const calculateRevenue = async (): Promise<number> => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};



const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const orderService = {
  createOrder,
  createPaymentIntentService,
  getAllOrders,
  customerOwnOrder,
  getSingleOrder,
  updateOrder,
  calculateRevenue,
  deleteOrder,
};
