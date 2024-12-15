import { NextFunction, Request, Response } from 'express';
import { AcademicFacultyService } from './service';
import sendResponse from '../../../shared/response';

const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicFacultyService.createService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const getAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicFacultyService.getAllService(req);
    sendResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const updateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicFacultyService.updateService(req);
    sendResponse(res, result);
  } catch (error) {
    console.log('error',error)
    next(error);
  }
};

export const AcademicFacultyController = {
  createController,
  getAllController,
  updateController
};