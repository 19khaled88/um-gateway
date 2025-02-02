import { NextFunction, Request, Response } from "express";
import { FacultyService } from "./service";
import sendResponse from "../../../shared/response";



const create = async(req:Request,res:Response,next:NextFunction)=>{
    try { 
        const result = await FacultyService.create(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

const singleFaculty=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await FacultyService.singleFaculty(req);
        sendResponse(res,result)    
    } catch (error) {
        next(error)
    }
}

const allFaculty=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await FacultyService.allFaculty(req);
        sendResponse(res,result)    
    } catch (error) {
        next(error)
    }
}

const update = async(req:Request,res:Response,next:NextFunction)=>{
    
    try {
        const result = await FacultyService.update(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
       
    }
}

const remove = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await FacultyService.remove(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

export const FacultyController = {
    create,
    singleFaculty,
    allFaculty,
    update,
    remove
}