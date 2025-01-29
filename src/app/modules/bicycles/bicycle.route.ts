import express from 'express';
import { BicycleControllers } from './bicycle.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), BicycleControllers.createBicycle);

router.get('/', BicycleControllers.getAllBicycle);

router.get('/:productId', BicycleControllers.getSingleBicycle);

router.put('/:productId',  auth(USER_ROLE.admin),BicycleControllers.updateBicycle);

router.delete('/:productId', auth(USER_ROLE.admin), BicycleControllers.deleteBicycle);

export const BicycleRoutes = router;
