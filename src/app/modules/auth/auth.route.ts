import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const authRoute = Router();

authRoute.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  AuthControllers.register,
);

authRoute.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);


authRoute.get('/user',
  //  auth(USER_ROLE.admin), 
   AuthControllers.getAllUsers);

authRoute.get(
  '/profile/:userId',
  auth(USER_ROLE.customer),
  AuthControllers.userProfile
);


authRoute.patch(
  '/users/:id',
  auth(USER_ROLE.customer),
  AuthControllers.updateUser,
);

authRoute.patch(
  '/users/:id/block',
  auth(USER_ROLE.admin),
  AuthControllers.blockUser,
);


export const AuthRoutes = authRoute;
