import { Request } from "express"
import { IGenericResponse } from "../../../interfaces/common"
import { AuthService } from "../../../shared/axios";

const createManagementDepartment =async (req:Request):Promise<IGenericResponse>=>{
    const headers = {
        Authorization: `${req.headers.authorization}`
      };

      const result:IGenericResponse = await AuthService.post('/managementDepartment/create-department',req.body,{headers})
      
      return result
}

const getSingleManagementDepartment =async () =>{

}

const getAllManagementDepartment = () =>{

}

const updateManagementDepartment =async (req:Request):Promise<IGenericResponse> =>{
    const headers = {
        Authorization: `${req.headers.authorization}`
      };
    const result:IGenericResponse = await AuthService.put(`/managementDepartment/${req.params.id}`,req.body,{headers})
    return result
}

const deleteManagementDepartment =async (req:Request) =>{
    const headers = {
        Authorization: `${req.headers.authorization}`
      };
    const result:IGenericResponse = await AuthService.delete(`/managementDepartment/${req.params.id}`,{headers})
    return result
}
export const ManagementDepartmentService = {
    createManagementDepartment,
    getSingleManagementDepartment,
    getAllManagementDepartment,
    updateManagementDepartment,
    deleteManagementDepartment
}