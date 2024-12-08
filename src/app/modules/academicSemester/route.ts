import express from 'express';
import { AcademiSemesterController } from './controller';

const router = express.Router();

router.post('/',AcademiSemesterController.create)


export const AcademicSemesterRouter = router;
