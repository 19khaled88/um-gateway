import { Request } from 'express';
import { IGenericResponse } from '../../../interfaces/common';
import { AuthService } from '../../../shared/axios';
import { ICloudinaryResponse, IUploadFile } from '../../../interfaces/fileType';
import { FileUploadCloudinary } from '../../../helpers/fileUpload';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';

type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
};

const create = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const file = req.file as IUploadFile;


  const queryParams = new URLSearchParams({
    email: req.body.faculty.email,
    contactNo: req.body.faculty.contactNo
  }).toString();

  const checkInDuplicate: ApiResponse = await AuthService.get(
    `/faculties/checkDuplicate?${queryParams}`,
    { headers }
  );

  if (
    checkInDuplicate &&
    checkInDuplicate.statusCode === 200 &&
    checkInDuplicate.success === true &&
    checkInDuplicate.data !== null
  ) {

    await FileUploadCloudinary.unSyncFile(file)
    return {
      statusCode: 409,
      success: false,
      message: 'Faculty already exists with the provided email or contact number',
      data: null
    };
  }

  // FileUploadCloudinary.uploadToCludinary(req.file)
  const uploadImage: ICloudinaryResponse = await FileUploadCloudinary.uploadToCludinary(file);

  if (uploadImage) {
    req.body.faculty.profileImage = uploadImage.secure_url;
  }

  const { academicDepartment, academicFaculty } = req.body.faculty;

  const academicDepartmentResponse = await AuthService.get(
    `/academicDepartment?syncId=${academicDepartment}`,
    { headers }
  );
  if (academicDepartmentResponse.data && Array.isArray(academicDepartmentResponse.data)) {
    req.body.faculty.academicDepartment = academicDepartmentResponse.data[0].id;
  }

  const academicFacultyResponse = await AuthService.get(
    `/academicFaculty?syncId=${academicFaculty}`,
    { headers }
  );
  if (academicFacultyResponse.data && Array.isArray(academicFacultyResponse.data)) {
    req.body.faculty.academicFaculty = academicFacultyResponse.data[0].id;
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

  const isFacultyExist = await AuthService.get(`/faculties/${req.params.id}`,{headers});
  
  if (!isFacultyExist) {
    if (req.file) {
      await FileUploadCloudinary.unSyncFile(req.file);
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'This faculty not found');
  }
  

  let uploadImage: ICloudinaryResponse | null = null;

  if (req.file && !isFacultyExist.data.profileImage) {
    const file = req.file as IUploadFile;
    uploadImage = await FileUploadCloudinary.uploadToCludinary(file);
  } 
  else if (req.file && isFacultyExist.data.profileImage) 
  {
    const file = req.file as IUploadFile;
    try {
      const isDeleted = await FileUploadCloudinary.deleteFromCloudinary(
        isFacultyExist.data.profileImage,
        'single'
      );
      if (isDeleted.result === 'ok') {
        uploadImage = await FileUploadCloudinary.uploadToCludinary(file);
      } else if (isDeleted.result === 'not found') {
        uploadImage = await FileUploadCloudinary.uploadToCludinary(file);
      }
    } catch (error) {
      console.error('Error deleting from Cloudinary:', error);
    }
  }


  const transformedBody = {
    name: req.body.faculty.name,
    dateOfBirth: req.body.faculty.dateOfBirth,
    gender: req.body.faculty.gender,
    bloodGroup: req.body.faculty.bloodGroup,
    email: req.body.faculty.email,
    contactNo: req.body.faculty.contactNo,
    emergencyContactNo: req.body.faculty.emergencyContactNo,
    presentAddress: req.body.faculty.presentAddress,
    permanentAddress: req.body.faculty.permanentAddress,
    department: req.body.faculty.department,
    designation: req.body.faculty.designation,
    password: req.body.password,
  };

  if (uploadImage) {
    req.body.profileImage = uploadImage.url;
  }

  

  const response: IGenericResponse = await AuthService.put(
    `/faculties/${req.params.id}`,
    transformedBody,
    { headers }
  );
  return response;
};

const remove = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  
  const response: IGenericResponse = await AuthService.delete(`/faculties/${req.params.id}`, {
    headers
  });
  return response;
};



export const FacultyService = {
  create,
  singleFaculty,
  allFaculty,
  update,
  remove
};
