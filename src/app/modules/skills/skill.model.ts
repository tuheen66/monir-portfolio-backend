import mongoose, { Schema } from 'mongoose';
import { TSkill } from './skill.interface';

const skillSchema = new Schema<TSkill>({
  logo: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillSchema)

export default Skill