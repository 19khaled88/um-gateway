import { Request } from 'express';
import { FileUploadCloudinary } from '../../../helpers/fileUpload';
import { ICloudinaryResponse, IUploadFile } from '../../../interfaces/fileType';
import { AuthService } from '../../../shared/axios';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';

type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
};

const create_student = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const queryParams = new URLSearchParams({
    email: req.body.student.email,
    contactNo: req.body.student.contactNo
  }).toString();

  const checkInDuplicate: ApiResponse = await AuthService.get(
    `/students/checkDuplicate?${queryParams}`,
    { headers }
  );

  if (
    checkInDuplicate &&
    checkInDuplicate.statusCode === 200 &&
    checkInDuplicate.success === true &&
    checkInDuplicate.data !== null
  ) {
    return {
      statusCode: 409,
      success: false,
      message: 'Student already exists with the provided email or contact number',
      data: null
    };
  }

  // FileUploadCloudinary.uploadToCludinary(req.file)
  const file = req.file as IUploadFile;
  const uploadImage: ICloudinaryResponse = await FileUploadCloudinary.uploadToCludinary(file);

  if (uploadImage) {
    req.body.student.profileImage = uploadImage.secure_url;
  }

  const { academicDepartment, academicFaculty, academicSemester } = req.body.student;

  const academicDepartmentResponse = await AuthService.get(
    `/academicDepartment?syncId=${academicDepartment}`,
    { headers }
  );
  if (academicDepartmentResponse.data && Array.isArray(academicDepartmentResponse.data)) {
    req.body.student.academicDepartment = academicDepartmentResponse.data[0].id;
  }

  const academicFacultyResponse = await AuthService.get(
    `/academicFaculty?syncId=${academicFaculty}`,
    { headers }
  );
  if (academicFacultyResponse.data && Array.isArray(academicFacultyResponse.data)) {
    req.body.student.academicFaculty = academicFacultyResponse.data[0].id;
  }

  const academicSemesterResponse = await AuthService.get(
    `/academicSemester?syncId=${academicSemester}`,
    { headers }
  );
  if (academicSemesterResponse.data && Array.isArray(academicSemesterResponse.data)) {
    req.body.student.academicSemester = academicSemesterResponse.data[0].id;
  }

  const response: IGenericResponse = await AuthService.post('/users/create-student', req.body, {
    headers
  });

  return response;
};

const singleStudent = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const response: IGenericResponse = await AuthService.get(`/students/${req.params.id}`, {
    headers
  });
  return response;
};

const allStudent = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const response: IGenericResponse = await AuthService.get(`/students`, {
    headers
  });
  return response;
};

const update = async (req: Request): Promise<IGenericResponse> => {
  const isStudentExist = await AuthService.get(`/students/${req.params.id}`);
  if (!isStudentExist) {
    if (req.file) {
      await FileUploadCloudinary.unSyncFile(req.file);
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'This user not found');
  }

  let uploadImage: ICloudinaryResponse | null = null;

  if (req.file && !isStudentExist.data.profileImage) {
    const file = req.file as IUploadFile;
    uploadImage = await FileUploadCloudinary.uploadToCludinary(file);
  } else if (req.file && isStudentExist.data.profileImage) {
    const file = req.file as IUploadFile;
    try {
      const isDeleted = await FileUploadCloudinary.deleteFromCloudinary(
        isStudentExist.data.profileImage,
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

  if (uploadImage) {
    req.body.student.profileImage = uploadImage.url;
  }

  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const response: IGenericResponse = await AuthService.put(`/students/${req.params.id}`, req.body, {
    headers
  });
  return response;
};

const remove = async (req: Request): Promise<IGenericResponse> => {
  const headers = {
    Authorization: `${req.headers.authorization}`
  };

  const response: IGenericResponse = await AuthService.delete(`/students/${req.params.id}`, {
    headers
  });
  return response;
};

export const StudentService = {
  create_student,
  singleStudent,
  allStudent,
  update,
  remove
};
