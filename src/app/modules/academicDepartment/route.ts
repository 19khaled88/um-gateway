import express from 'express';
import { AcademicDepartmentController } from './controller';

const router = express.Router();

router.post('/create', AcademicDepartmentController.createController);
router.get('/all', AcademicDepartmentController.getAllController);
router.put('/update/:id', AcademicDepartmentController.updateController);
router.delete('/delete/:id', AcademicDepartmentController.deleteController);

export const AcademicDepartmentRouter = router;
