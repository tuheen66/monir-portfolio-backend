import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.post('/create-order', OrderController.createOrder);
router.post('/payment/create-payment-intent', OrderController.createPaymentIntent);
router.get('/user/:userId',auth(USER_ROLE.user), OrderController.getUserOwnOrders);



export const OrderRoutes = router;