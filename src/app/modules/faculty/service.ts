import { Request } from "express";
import { IGenericResponse } from "../../../interfaces/common";
import { AuthService } from "../../../shared/axios";




const update = async(req:Request):Promise<IGenericResponse> =>{
    const headers = {
        Authorization: `${req.headers.authorization}`,
    };
    console.log(req.body,req.params,headers)
    const response:IGenericResponse = await AuthService.put(`/faculties/${req.params.id}`,req.body,{headers});
    console.log(response)
    return response
    
}


export  const FacultyService = {
    update
}
