import { Request } from "express";
import { IGenericResponse } from "../../../interfaces/common";
import { ICloudinaryResponse, IUploadFile } from "../../../interfaces/fileType";
import { AuthService } from "../../../shared/axios";
import { FileUploadCloudinary } from "../../../helpers/fileUpload";


type ApiResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
  };

const create = async (req: Request):Promise<IGenericResponse> => {
    const headers = {
      Authorization: `${req.headers.authorization}`
    };
    
    const file = req.file as IUploadFile | undefined;
    
  
    const queryParams = new URLSearchParams({
      email: req.body.superAdmin.email,
      contactNo: req.body.superAdmin.contactNo
    }).toString();
  
    
    const checkInDuplicate: ApiResponse = await AuthService.get(
      `/superAdmin/checkDuplicte?${queryParams}`,
      { headers }
    );

    if (
      checkInDuplicate &&
      checkInDuplicate.statusCode === 200 &&
      checkInDuplicate.success === true &&
      checkInDuplicate.data !== null
    ) {
  
      
      if(file){
        await FileUploadCloudinary.unSyncFile(file)
      }
      
      return {
        statusCode: 409,
        success: false,
        message: 'Super admin already exists with the provided email or contact number',
        data: null
      };
    }
  
    if(file){
      // FileUploadCloudinary.uploadToCludinary(req.file)
      const uploadImage: ICloudinaryResponse = await FileUploadCloudinary.uploadToCludinary(file);

      if (uploadImage) {
        req.body.faculty.profileImage = uploadImage.secure_url;
      }
    }
    
    
    const response: IGenericResponse = await AuthService.post('/users/create-super-admin', req.body, {
      headers
    });
  
    return response;
  };





  export const SuperAdminService = {
    create,
  };