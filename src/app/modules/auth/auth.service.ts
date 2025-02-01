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

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   // const user = await User.isUserExistsById(userData.id);
//   const { email } = userData;

//   const user = await User.findOne({email});
//   const {userPassword}= userData

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//   }

//   // checking if the user is blocked

//   if (user.isBlocked) {
//     throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
//   }

//   //checking if the password is correct

//   const isPasswordMatched = async (oldPassword: string, userPassword: string) => {
//     return await bcrypt.compare(oldPassword, userPassword);
//   };

//   if (!(await isPasswordMatched(payload.oldPassword, user.password))) {
//     throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
//   }

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );

//   await User.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//     },
//   );

//   return null;
// };

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { email } = userData;

  // Checking if the user exists
  const user = await User.findOne({ email }).select('+password'); // Using lean() to improve performance
  
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  // Checking if the user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  // Checking if the old password is correct
  const isPasswordMatched = await bcrypt.compare(payload.oldPassword, user.password);
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Incorrect old password!');
  }

  // Hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  // Update the password in the database
  await User.findOneAndUpdate(
    { email }, // Finding user by email
    { password: newHashedPassword }
  );

  return { message: 'Password changed successfully!' };
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const personalProfile = async (email: string) => {
  const result = await User.find({ email });
  return result;
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
  changePassword,
  personalProfile,
  getAllUsers,
  blockUser,
};
