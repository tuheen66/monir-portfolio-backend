import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { SkillService } from "./skill.service";

const createSkill = catchAsync(async (req, res) => {
    const skill = req.body;
    const result = await SkillService.createSkill(skill);
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Skill added successfully',
      data: result,
    });
  });
  
  const getAllSkill = catchAsync(async (req, res) => {
    const result = await SkillService.getAllSkill();
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Skill fetched successfully',
      data: result,
    });
  });

  export const SkillController ={
    createSkill,
    getAllSkill
  }