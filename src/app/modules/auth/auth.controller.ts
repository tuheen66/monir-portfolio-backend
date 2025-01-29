/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const register = catchAsync(async (req, res) => {
  const result = await authServices.register(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authServices.login(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  if (!req.user) {
    throw new Error('User not authenticated');
  }
  const result = await authServices.changePassword(req.user as JwtPayload, passwordData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});


const personalProfile = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await authServices.personalProfile(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customers profile fetched successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await authServices.getAllUsers();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Users fetched successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization as string;
  const result = await authServices.blockUser(id, token);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: null,
  });
});

export const AuthControllers = {
  register,
  login,
  changePassword,
  personalProfile,
  getAllUsers,
  blockUser,
};
