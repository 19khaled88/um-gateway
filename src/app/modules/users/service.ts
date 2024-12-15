import { Request } from "express"
import { FileUploadCloudinary } from "../../../helpers/fileUpload"
import { ICloudinaryResponse, IUploadFile } from "../../../interfaces/fileType";
import { AuthService } from "../../../shared/axios";


const create = async(req:Request)=>{
    // FileUploadCloudinary.uploadToCludinary()
    const file = req.file as IUploadFile;
    const uploadImage:ICloudinaryResponse = await FileUploadCloudinary.uploadToCludinary(file)
    if(uploadImage){
        req.body.profileImage = uploadImage.secure_url
    }
    const {academicDepartment,academicFaculty, academicSemester} = req.body

    const academicDepartmentResponse = await AuthService.get(`/academicDepartment?syncId=${academicDepartment}`)
    if(academicDepartmentResponse.data && Array.isArray(academicDepartmentResponse.data)){
        req.body.student.academicDepartment = academicDepartmentResponse.data[0].id
    }

    const academicFacultyResponse = await AuthService.get(`/academicFaculty?syncId=${academicFaculty}`)
    if(academicFacultyResponse.data && Array.isArray(academicFacultyResponse.data)){
        req.body.student.academicFaculty = academicFacultyResponse.data[0].id
    }

    const academicSemesterResponse = await AuthService.get(`/academicSemester?syncId=${academicSemester}`)
    if(academicSemesterResponse.data && Array.isArray(academicSemesterResponse.data)){
        req.body.student.academicSemester = academicSemesterResponse.data[0].id
    }
}


export const UserService = {
    create
}