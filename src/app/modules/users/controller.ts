import { NextFunction, Request, Response } from "express"
import { UserService } from "./service"
import sendResponse from "../../../shared/response"

const create  = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await UserService.create(req)
        // sendResponse(res,result)
        console.log(result)
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    create
}