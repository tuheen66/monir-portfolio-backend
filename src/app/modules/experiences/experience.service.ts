import { TExperience } from "./experience.interface";
import Experience from "./experience.model";

const createExperience = async (message: TExperience) => {
    const result = await Experience.create(message);
  
    return result;
  };

  const getAllExperience = async () => {
    const result = await Experience.find();
    return result;
  };

  const getSingleExperience = async (_id: string) => {
    const result = await Experience.findById(_id);
    return result;
  };

  const updateExperience = async (_id: string, experience: TExperience) => {
      const result = await Experience.findByIdAndUpdate(_id, experience, { new: true });
      return result;
    };


  export const ExperienceService = {
    createExperience,
    getAllExperience,
    getSingleExperience,
    updateExperience
  }