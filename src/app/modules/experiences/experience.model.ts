import mongoose, { Schema } from 'mongoose';
import { TExperience } from './experience.interface';

const experienceSchema = new Schema<TExperience>({
  position: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  duties: {
    type: [String],
    required: true,
  },
});

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
