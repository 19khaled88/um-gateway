import express from 'express';
import { AuthenticationController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './validation';

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
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthenticationController.changePassword
);

export const AuthRoutes = router;
