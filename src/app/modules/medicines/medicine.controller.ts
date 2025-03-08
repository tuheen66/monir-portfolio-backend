import { StatusCodes } from 'http-status-codes';
import { MedicineServices } from './medicine.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createMedicine = catchAsync(async (req, res) => {
  const medicine = req.body;
  const result = await MedicineServices.createMedicine(medicine);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Medicine create successfully',
    data: result,
  });
});

const getAllMedicines = catchAsync(async (req, res) => {
  const result = await MedicineServices.getAllMedicines();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Medicines fetched successfully',
    data: result,
  });
});

const getSingleMedicine = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MedicineServices.getSingleMedicine(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine fetched successfully',
    data: result,
  });
});

const updateMedicine = catchAsync(async (req, res) => {
  const id = req.params.id;
  const medicine = req.body;
  const result = await MedicineServices.updateMedicine(id, medicine);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine updated successfully',
    data: result,
  });
});

const deleteMedicine = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MedicineServices.deleteMedicine(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine deleted successfully',
    data: result,
  });
})

export const MedicineControllers = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine
};
