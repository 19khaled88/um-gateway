import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/apiError';
import { JwtHelper } from '../../helpers/jwtHelper';
import { IAuthUser } from '../../interfaces/auth';

const auth =
  (...requiredRoles: string[]) =>
    async (req: any, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization;
  
        if (!token) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
  
        const verifiedUser: IAuthUser = JwtHelper.verifyToken(token);
  
        if (!verifiedUser) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
  
        req.user = verifiedUser;
  
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
          
        }
  
        next(); // Move to the next middleware
      } catch (err) {
        next(err); // Pass the error to the global error handler
      }
    };

export default auth;
