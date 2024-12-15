import express from 'express';
import { AcademicFacultyController } from './controller';

const router = express.Router();

router.post('/create', AcademicFacultyController.createController);
router.get('/all', AcademicFacultyController.getAllController);
router.put('/update/:id', AcademicFacultyController.updateController);

export const AcademicFacultyRouter = router;
