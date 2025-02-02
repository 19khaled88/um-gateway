import { Request } from "express"
import { FileUploadCloudinary } from "../../../helpers/fileUpload"
import { ICloudinaryResponse, IUploadFile } from "../../../interfaces/fileType";
import { AuthService } from "../../../shared/axios";
import { IGenericResponse } from "../../../interfaces/common";


const create_adimn = async(req:Request)=>{
    // FileUploadCloudinary.uploadToCludinary(req.file)
    const file = req.file as IUploadFile;
    const uploadImage:ICloudinaryResponse = await FileUploadCloudinary.uploadToCludinary(file)
    
    // Log authorization header
    const headers = {
        Authorization: `${req.headers.authorization}`,
    };

    if(uploadImage){
        req.body.student.profileImage = uploadImage.secure_url
    }
    const {academicDepartment,academicFaculty, academicSemester} = req.body.student

    const academicDepartmentResponse = await AuthService.get(`/academicDepartment?syncId=${academicDepartment}`,{headers})
    if(academicDepartmentResponse.data && Array.isArray(academicDepartmentResponse.data)){
        req.body.student.academicDepartment = academicDepartmentResponse.data[0].id
    }

    const academicFacultyResponse = await AuthService.get(`/academicFaculty?syncId=${academicFaculty}`,{headers})
    if(academicFacultyResponse.data && Array.isArray(academicFacultyResponse.data)){
        req.body.student.academicFaculty = academicFacultyResponse.data[0].id
    }

    const academicSemesterResponse = await AuthService.get(`/academicSemester?syncId=${academicSemester}`,{headers})
    if(academicSemesterResponse.data && Array.isArray(academicSemesterResponse.data)){
        req.body.student.academicSemester = academicSemesterResponse.data[0].id
    }
   
    const response:IGenericResponse = await AuthService.post('/users/create-student', req.body, {headers});
    
    return response;
}

const singleAdmin = async (req: Request): Promise<IGenericResponse> => {
    const headers = {
      Authorization: `${req.headers.authorization}`
    };
  
    const response: IGenericResponse = await AuthService.get(`/students/${req.params.id}`, {
      headers
    });
    return response;
};
  
const allAdmin = async (req: Request): Promise<IGenericResponse> => {
    const headers = {
    Authorization: `${req.headers.authorization}`
    };

    const response: IGenericResponse = await AuthService.get(`/students`, {
    headers
    });
    return response;
};

const update = async (req: Request): Promise<IGenericResponse> => {
    const headers = {
        Authorization: `${req.headers.authorization}`
    };

    const response: IGenericResponse = await AuthService.put(
        `/students/${req.params.id}`,
        req.body,
        { headers }
    );
    return response;
};

const remove = async (req: Request):Promise<IGenericResponse> => {

    const headers = {
        Authorization: `${req.headers.authorization}`
    };

    const response: IGenericResponse = await AuthService.delete(
        `/students/${req.params.id}`,
        { headers }
    );
    return response;
};

export const StudentService = {
    create_adimn,
    singleAdmin,
    allAdmin,
    update,
    remove
}