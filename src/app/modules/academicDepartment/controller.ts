import { NextFunction, Request, Response } from 'express';
import { AcademicDepartmentService } from './service';
import sendResponse from '../../../shared/response';

const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicDepartmentService.createService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicDepartmentService.getAllService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const updateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicDepartmentService.updateService(req);
    sendResponse(res, result);
  } catch (error) {
    
    next(error);
  }
};

const deleteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicDepartmentService.deleteService(req);
    sendResponse(res, result);
  } catch (error) {
    
    next(error);
  }
};
export const AcademicDepartmentController = {
  createController,
  getAllController,
  updateController,
  deleteController
};