import { TMedicine } from './medicine.interface';
import { Medicine } from './medicine.model';

const createMedicine = async (medicine: TMedicine) => {
  const result = await Medicine.create(medicine);
  return result;
};

const featuredMedicines = async () => {
  const result = await Medicine.find();
  return result;
};

export const getAllMedicines = async () => {
  const medicines = await Medicine.find();
  return medicines;
};

const getSingleMedicine = async (_id: string) => {
  const result = await Medicine.findById(_id);
  return result;
};

const updateMedicine = async (_id: string, medicine: TMedicine) => {
  const result = await Medicine.findByIdAndUpdate(_id, medicine, { new: true });
  return result;
};

const deleteMedicine = async (_id: string) => {
  const result = await Medicine.findByIdAndDelete(_id);
  return result;
};

export const MedicineServices = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
  featuredMedicines,
};
