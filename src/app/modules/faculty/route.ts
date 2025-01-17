import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import express, { NextFunction, Request, Response } from 'express';
import { FacultyController } from './controller';
import { FacultyValidation } from './validation';
import { FileUploadCloudinary } from '../../../helpers/fileUpload';

const router = express.Router();

router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  // validateRequest(FacultyValidation.createFacultyZodSchema),
  // FacultyController.create
  FileUploadCloudinary.upload.single('file'),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = FacultyValidation.createFacultyZodSchema.parse(JSON.parse(req.body.data));
    return FacultyController.create(req, res, next);
  }
);
router.put(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.update
);

router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.FACULTY),FacultyController.remove)

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  FacultyController.singleFaculty
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY),
  FacultyController.allFaculty
);

export const FacultyRoutes = router;
