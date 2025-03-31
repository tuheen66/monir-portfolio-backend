import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectService } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const project = req.body;
  const result = await ProjectService.createProject(project);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Project added successfully',
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProject();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched successfully',
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectService.getSingleProject(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
    const id = req.params.id;
    const project = req.body;
    const result = await ProjectService.updateProject(id, project)
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Project updated successfully',
      data: result,
    });
  });

  const deleteProject = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await ProjectService.deleteProject(id);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Project deleted successfully',
      data: result,
    });
  });


export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject
};
