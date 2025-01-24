import QueryBuilder from '../../builder/QueryBuilder';
import { bicycleSearchableFields } from './bicycle.constant';
import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.mode';

const createBicycleIntoDB = async (bicycle: TBicycle) => {
  const result = await Bicycle.create(bicycle);
  return result;
};

const getAllBicycleFromDB = async (query: Record<string, unknown>) => {

    const bicycleQuery= new QueryBuilder(Bicycle.find(), query).search(bicycleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();


  const result = await bicycleQuery.modelQuery;
  return result;
};

const getSingleBicycleFromDB = async (id: string) => {
  const result = await Bicycle.findById(id);
  return result;
};

const updateBicycleIntoDB = async (productId: string, data: Partial<TBicycle>) => {
    const result = await Bicycle.findByIdAndUpdate(productId, data,{
      new:true
    });
    return result;
  };

  const deleteBicycleFromDB = async (productId: string) => {
    const result = await Bicycle.findByIdAndDelete(productId);
    return result;
  };

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
  getSingleBicycleFromDB,
  updateBicycleIntoDB,
  deleteBicycleFromDB
};
