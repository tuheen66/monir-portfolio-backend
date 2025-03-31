import express from 'express';
import { ExperienceController } from './experience.controller';


const router = express.Router();

router.post('/experience', ExperienceController.createExperience);
router.get('/experience', ExperienceController.getAllExperience);
router.get('/experience/:id', ExperienceController.getSingleExperience);
router.patch('/experience/:id', ExperienceController.updateExperience);


export const ExperienceRoutes = router;