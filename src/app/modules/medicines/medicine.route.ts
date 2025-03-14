import express from 'express';
import { MedicineControllers } from './medicine.controller';

const router = express.Router();

router.post('/add-medicine', MedicineControllers.createMedicine);
router.get('/all-medicines', MedicineControllers.getAllMedicines);
router.get('/featured-medicines', MedicineControllers.getAllMedicines);
router.get('/:id', MedicineControllers.getSingleMedicine);
router.put('/:id', MedicineControllers.updateMedicine);
router.delete('/:id', MedicineControllers.deleteMedicine);

export const MedicineRoutes = router;
