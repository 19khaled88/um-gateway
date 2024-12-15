import express from 'express';
import { AcademiSemesterController } from './controller';

const router = express.Router();

router.post('/create', AcademiSemesterController.createController);
router.get('/all', AcademiSemesterController.getAllController);
router.put('/update/:id', AcademiSemesterController.updateController);
router.delete('/delete/:id',AcademiSemesterController.deleteController);

export const AcademicSemesterRouter = router;
