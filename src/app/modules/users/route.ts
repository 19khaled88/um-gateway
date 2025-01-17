import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadCloudinary } from '../../../helpers/fileUpload';
import { UserValidationApiGateway } from './validation';


const router = express.Router();

router.post('/create-student', 
    auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
    FileUploadCloudinary.upload.single('file'),
    (req:Request,res:Response,next:NextFunction) =>{
        req.body = UserValidationApiGateway.createStudentValidation.parse(JSON.parse(req.body.data))
        return UserController.create_student(req,res,next)
    }
)

export const UserRoutes = router

