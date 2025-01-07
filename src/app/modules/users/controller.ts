import { NextFunction, Request, Response } from "express"
import { UserService } from "./service"
import sendResponse from "../../../shared/response"
import httpStatus from "http-status"

const create_student  = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await UserService.create_student(req)
        sendResponse(res,result)
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    create_student
}