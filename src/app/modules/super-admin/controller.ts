import { NextFunction,Request,Response } from "express";
import { SuperAdminService } from "./service";
import sendResponse from "../../../shared/response";

const create = async(req:Request,res:Response,next:NextFunction)=>{
    try { 
        
        const result = await SuperAdminService.create(req);
        sendResponse(res,result)
      
    } catch (error) {
       next(error) 
    }
}

export const SuperAdminController = {
    create,
   
}










