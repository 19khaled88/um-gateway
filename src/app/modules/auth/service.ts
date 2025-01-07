import { Request } from "express";
import { IGenericResponse } from "../../../interfaces/common";
import { AuthService } from "../../../shared/axios";

const login = async(req:Request):Promise<IGenericResponse> =>{
    
    const response:IGenericResponse = await AuthService.post('/auth/login',req.body);
    return response
}

const refreshToken = async(req:Request):Promise<IGenericResponse> =>{
    const {refreshtoken} = req.cookies;
    const response:IGenericResponse = await AuthService.post('/auth/refresh-token',req.body,{
        headers:{
            cookie:`refreshtoken=${refreshtoken}`
        }
    });
    return response
}

const changePassword = async(req:Request):Promise<IGenericResponse> =>{
    const headers = {
        Authorization: `${req.headers.authorization}`,
    };
    const response:IGenericResponse = await AuthService.post('/auth/chanage-password',req.body,{headers});
    return response
}

export  const AuthenticationService = {
    login,
    refreshToken,
    changePassword
}