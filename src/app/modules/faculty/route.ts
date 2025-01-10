import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { FacultyController } from './controller';
import { FacultyValidation } from './validation';

const router = express.Router();

router.put(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.update
);

export const FacultyRoutes = router;
