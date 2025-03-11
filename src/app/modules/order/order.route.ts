import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/create-order', OrderController.createOrder);
router.post(
  '/payment/create-payment-intent',
  OrderController.createPaymentIntent,
);
router.get('/', auth(USER_ROLE.admin), OrderController.getAllOrders);
router.get('/:id', auth(USER_ROLE.admin), OrderController.getSingleOrder);
router.patch('/:id', auth(USER_ROLE.admin), OrderController.updateOrderStatus);
router.get(
  '/user/:userId',
  auth(USER_ROLE.customer),
  OrderController.getUserOwnOrders,
);
router.get(
  '/admin/:user',
  auth(USER_ROLE.admin),
  OrderController.getSingleUserOrders,
);

export const OrderRoutes = router;
