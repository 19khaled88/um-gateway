import { NextFunction, Request, Response } from "express";
import { AuthenticationService } from "./service";
import sendResponse from "../../../shared/response";
import config from "../../../config";


const loginUser = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await AuthenticationService.login(req);
        const {refresh, ...others} = result.data
        
        const cookieOptions ={
            secure:config.env === 'production',
            httpOnly:true
        }
        
        res.cookie('refreshtoken',result.data.refresh,cookieOptions)
        result.data = others
        
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

const refreshToken = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await AuthenticationService.refreshToken(req);
        const {refresh, ...others} = result.data
        
        const cookieOptions ={
            secure:config.env === 'production',
            httpOnly:true
        }
        
        res.cookie('refreshtoken',result.data.refresh,cookieOptions)
        result.data = others
        result.message = 'New refresh token generated'
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

const changePassword = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await AuthenticationService.changePassword(req);
        sendResponse(res,result)
    } catch (error) {
       next(error) 
    }
}

export const AuthenticationController = {
    loginUser,
    refreshToken,
    changePassword
}