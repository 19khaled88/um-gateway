import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './service';
import sendResponse from '../../../shared/response';

const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.createService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.getAllService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const updateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const result = await AcademicSemesterService.updateService(req);
    sendResponse(res, result);
  } catch (error) {
    
    next(error);
  }
};
const deleteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
 
    const result = await AcademicSemesterService.deleteService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const AcademiSemesterController = {
  createController,
  getAllController,
  updateController,
  deleteController
};
