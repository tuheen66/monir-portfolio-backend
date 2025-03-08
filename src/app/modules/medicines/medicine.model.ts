import { model, Schema } from 'mongoose';
import { TMedicine } from './medicine.interface';

const medicineSchema: Schema = new Schema<TMedicine>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a positive number'],
  },
  description: {
    type: String,
    required: true,
  },
  manufacturerDetails: {
    type: String,
    required: true,
  },
  manufacturerName: {
    type: String,
    required: true,
  },
  prescriptionRequired: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

medicineSchema.methods.lowInventory = async function (orderQuantity: number) {
  if (orderQuantity > this.quantity) {
    throw new Error('Insufficient stock');
  }
};

medicineSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.inStock = false;
  } else {
    this.inStock = true;
  }

  next();
});

export const Medicine = model<TMedicine>('Medicine', medicineSchema);
