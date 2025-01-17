import { Request } from 'express';
import { IGenericResponse } from '../../../interfaces/common';
import { AuthService } from '../../../shared/axios';
import { ICloudinaryResponse, IUploadFile } from '../../../interfaces/fileType';
import { FileUploadCloudinary } from '../../../helpers/fileUpload';

const create = async (req: Request): Promise<IGenericResponse> => {
  // FileUploadCloudinary.uploadToCludinary(req.file)
  const file = req.file as IUploadFile;
  const uploadImage: ICloudinaryResponse = await FileUploadCloudinary.uploadToCludinary(file);

  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  if (uploadImage) {
    req.body.faculty.profileImage = uploadImage.secure_url;
  }

  const response: IGenericResponse = await AuthService.post('/users/create-faculty', req.body, {
    headers
  });
  return response;
};

const singleFaculty = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const response: IGenericResponse = await AuthService.get(`/faculties/${req.params.id}`, {
    headers
  });
  return response;
};

const allFaculty = async (req: Request): Promise<IGenericResponse> => {
    const headers = {
      Authorization: `${req.headers.authorization}`
    };
  
    const response: IGenericResponse = await AuthService.get(`/faculties`, {
      headers
    });
    return response;
  };

const update = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const response: IGenericResponse = await AuthService.put(
    `/faculties/${req.params.id}`,
    req.body,
    { headers }
  );
  return response;
};

// const remove = async (req: Request): Promise<IGenericResponse> => {
//     const headers = {
//       Authorization: `${req.headers.authorization}`
//     };
  
    
//     const response: IGenericResponse = await AuthService.delete(
//       `/faculties/${req.params.id}`,
//       { headers }
//     );
//     return response;
//   };

const remove = async (req: Request) => {

  const headers = {
    Authorization: `${req.headers.authorization}`
  };
  
  const response: IGenericResponse = await AuthService.delete(
    `/faculties/${req.params.id}`,
    { headers }
  );
  return response;
};

export const FacultyService = {
  create,
  singleFaculty,
  allFaculty,
  update,
  remove
};
