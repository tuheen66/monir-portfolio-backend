import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExperienceService } from "./experience.service";

const createExperience = catchAsync(async (req, res) => {
    const project = req.body;
    const result = await ExperienceService.createExperience(project);
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Experience added successfully',
      data: result,
    });
  });

  const getAllExperience = catchAsync(async (req, res) => {
    const result = await ExperienceService.getAllExperience();
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Experience fetched successfully',
      data: result,
    });
  });

  const getSingleExperience = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await ExperienceService.getSingleExperience(id);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Experience fetched successfully',
      data: result,
    });
  });


  const updateExperience = catchAsync(async (req, res) => {
      const id = req.params.id;
      const project = req.body;
      const result = await ExperienceService.updateExperience(id, project)
    
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Experience updated successfully',
        data: result,
      });
    });


  export const ExperienceController ={
    createExperience,
    getAllExperience,
    getSingleExperience,
    updateExperience
  }