import express, { NextFunction, Request, Response } from 'express';
import { StudentController } from './controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadCloudinary } from '../../../helpers/fileUpload';
import { StudentValidationApiGateway } from './validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadCloudinary.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StudentValidationApiGateway.createStudentValidation.parse(JSON.parse(req.body.data));
    return StudentController.create_student(req, res, next);
  }
);

router.put(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  FileUploadCloudinary.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StudentValidationApiGateway.updateStudentZodSchema.parse(JSON.parse(req.body.data));
    return StudentController.update(req, res, next);
  }
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentController.remove
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentController.singleStudent
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentController.allStudent
);

export const StudentRoutes = router;
