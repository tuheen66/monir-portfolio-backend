import { TSkill } from "./skill.interface";
import Skill from "./skill.model";

const createSkill = async (skill: TSkill) => {
  const result = await Skill.create(skill);
  return result;
};

const getAllSkill = async () => {
  const result = await Skill.find();
  return result;
};


export const SkillService ={
    createSkill ,
    getAllSkill
}