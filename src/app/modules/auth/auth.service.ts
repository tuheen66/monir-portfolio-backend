/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name as string,
    email: user?.email as string,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const userProfile = async (token: string | undefined) => {
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

    const result = await User.findById(userId);
    return result;
  } catch (error: any) {
    console.error('Error creating order:', error.message);
    throw new Error('Order creation failed. Please try again.');
  }
};

const blockUser = async (id: string, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { role } = decoded;

  if (role !== 'admin') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

export const authServices = {
  register,
  login,
  userProfile,
  getAllUsers,
  blockUser,
};
