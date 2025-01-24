import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils';
import config from '../../config';


const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
    const user = await User.findOne({ email: payload.email }).select('+password');
  
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }
  
    if (user.isBlocked === true) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
    }
  
    const isPasswordMatch = await bcrypt.compare(
      payload?.password,
      user?.password,
    );
  
    if (!isPasswordMatch) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
  
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    };
  
    const token = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
    return { token };
  };

export const authServices = {
  register,
  login
};
