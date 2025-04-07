import express from 'express';
import { SkillController } from './skill.controller';


const router = express.Router();

router.post('/skills',SkillController.createSkill);
router.get('/skills', SkillController.getAllSkill);


export const SkillRoutes = router;
