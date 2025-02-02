import { NextFunction, Request, Response } from "express";
import { ManagementDepartmentService } from "./service";
import sendResponse from "../../../shared/response";

const createManagementDepartment = async(req:Request,res:Response,next:NextFunction)=>{
    try { 
        const result = await ManagementDepartmentService.createManagementDepartment(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

const updateManagementDepartment = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await ManagementDepartmentService.updateManagementDepartment(req);
        sendResponse(res,result) 
    } catch (error) {
        next(error) 
    }
}

const deleteManagementDepartment = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await ManagementDepartmentService.deleteManagementDepartment(req);
        sendResponse(res,result) 
    } catch (error) {
        next(error) 
    }
}

export const ManagementDepartmentController = {
    createManagementDepartment,
    updateManagementDepartment,
    deleteManagementDepartment
}