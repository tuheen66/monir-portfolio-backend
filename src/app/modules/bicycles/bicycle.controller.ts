import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { BicycleServices } from './bicycle.service';

import { StatusCodes } from 'http-status-codes';

const createBicycle = catchAsync(async (req, res) => {
  const bicycle = req.body;
  const result = await BicycleServices.createBicycleIntoDB(bicycle);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle created successfully',
    data: result,
  });
});

const getAllBicycle = catchAsync(async (req, res) => {
  const result = await BicycleServices.getAllBicycleFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Bicycles fetched successfully',
    data: result,
  });
});

const getSingleBicycle = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const result = await BicycleServices.getSingleBicycleFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle fetched successfully',
    data: result,
  });
});

const updateBicycle = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const data = req.body;
  const result = await BicycleServices.updateBicycleIntoDB(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle updated successfully',
    data: result,
  });
});

const deleteBicycle = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const result = await BicycleServices.deleteBicycleFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle deleted successfully',
    data: result,
  });
});

export const BicycleControllers = {
  createBicycle,
  getAllBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
