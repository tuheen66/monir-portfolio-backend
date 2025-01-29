import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

const customerOwnOrder = async (email: string) => {
  const result = await Order.find({email});
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

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
  customerOwnOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
