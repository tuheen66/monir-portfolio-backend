import express from 'express';
import { ProjectController } from './project.controller';

const router = express.Router();

router.post('/projects', ProjectController.createProject);
router.get('/projects', ProjectController.getAllProject);
router.get('/projects/:id', ProjectController.getSingleProject);
router.patch('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProject);

export const ProjectRoutes = router;
