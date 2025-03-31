import express from 'express';
import { MessageController } from './message.controller';

const router = express.Router();

router.post('/message', MessageController.createMessage);
router.get('/message', MessageController.getAllMessage);
router.delete('/message/:id', MessageController.deleteMessage);

export const MessageRoutes = router;
