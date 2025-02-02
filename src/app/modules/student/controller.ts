import { NextFunction, Request, Response } from "express"
import sendResponse from "../../../shared/response"
import { StudentService } from "./service"

const create_student  = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await StudentService.create_student(req)
        sendResponse(res,result)
    } catch (error) {
        next(error)
    }
}

const singleStudent=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await StudentService.singleStudent(req);
        sendResponse(res,result)    
    } catch (error) {
        next(error)
    }
}

const allStudent=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await StudentService.allStudent(req);
        sendResponse(res,result)    
    } catch (error) {
        next(error)
    }
}

const update = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await StudentService.update(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

const remove = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await StudentService.remove(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

export const StudentController = {
    create_student,
    singleStudent,
    allStudent,
    update,
    remove
}