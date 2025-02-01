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

const createPaymentIntent = catchAsync(async (req, res) => {
  const { totalPrice } = req.body;
  const clientSecret =
    await orderService.createPaymentIntentService(totalPrice);

 
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment secret created successfully',
    data: clientSecret,
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

const getCustomerOwnOrder = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await orderService.customerOwnOrder(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customers Order fetched successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const id = req.params.orderId;
  const result = await orderService.getSingleOrder(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Orders fetched successfully',
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

const getRevenue = catchAsync(async(req, res) => {
     const totalRevenue = await orderService.calculateRevenue();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: ' Revenue calculated successfully',
      data: {totalRevenue} ,
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
  createPaymentIntent,
  getAllOrders,
  getCustomerOwnOrder,
  getSingleOrder,
  updateOrder,
  getRevenue,
  deleteOrder,
};
