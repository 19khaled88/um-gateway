import { NextFunction, Request, Response } from "express";
import { FacultyService } from "./service";
import sendResponse from "../../../shared/response";




const update = async(req:Request,res:Response,next:NextFunction)=>{
    try {
       
        const result = await FacultyService.update(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

export const FacultyController = {
    update
}