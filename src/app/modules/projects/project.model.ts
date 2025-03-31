import mongoose, { Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
  {
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    image: { type: String, required: true },
    full_image: { type: String, required: true },
    technologies: { type: [String], required: true },
    features: { type: [String], required: true },
    live_link: { type: String, required: true },
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
