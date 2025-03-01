import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadCloudinary } from '../../../helpers/fileUpload';
import { SuperAdminZodValidation } from './validation';
import { SuperAdminController } from './controller';

const router = express.Router();

router.post(
  '/create-super-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
  FileUploadCloudinary.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SuperAdminZodValidation.createSuperAdminZodSchema.parse(JSON.parse(req.body.data));
    return SuperAdminController.create(req, res, next);
  }
);

export const SuperAdminRoutes = router;