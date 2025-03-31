import { TProject } from './project.interface';
import Project from './project.model';

const createProject = async (project: TProject) => {
  const result = await Project.create(project);
  return result;
};

const getAllProject = async () => {
  const result = await Project.find();
  return result;
};

const getSingleProject = async (_id: string) => {
  const result = await Project.findById(_id);
  return result;
};

const updateProject = async (_id: string, project: TProject) => {
    const result = await Project.findByIdAndUpdate(_id, project, { new: true });
    return result;
  };

  const deleteProject = async (_id: string) => {
    const result = await Project.findByIdAndDelete(_id);
    return result;
  };
  

export const ProjectService = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject
};


