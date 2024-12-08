import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './service';
import sendResponse from '../../../shared/response';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.create(req);
    sendResponse(res, {
      statusCode: 200,
      message: '',
      success: true,
      data: result,
      meta: {
        limit: 10,
        page: 1,
        total: 0
      }
    });
  } catch (error) {
    
    next(error);
  }
};

export const AcademiSemesterController = {
  create
};
