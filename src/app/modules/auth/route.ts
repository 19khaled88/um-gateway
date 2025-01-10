import express from 'express';
import { AuthenticationController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthenticationController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthenticationController.refreshToken
);
router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthenticationController.changePassword
);

export const AuthRoutes = router;
