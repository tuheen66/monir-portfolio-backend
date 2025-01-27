import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const order = req.body;

  const result = await orderService.createOrder(order);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Orders fetched successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const id = req.params.orderId;
  const result = await orderService.getSingleOrder(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const id = req.params.orderId;
  const data = req.body;
  const result = await orderService.updateOrder(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.orderId;
  const result = await orderService.deleteOrder(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
