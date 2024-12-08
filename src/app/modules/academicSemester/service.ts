import { Request } from 'express';
import { CoreService as HttpService } from '../../../shared/axios';

const create = async (req: Request) => {

  const response = await HttpService.post('/academic-semester/create', req.body, {
    headers: {
      Authorization: req.headers.authorization
    }
  });
  return response;
};

export const AcademicSemesterService = {
  create
};
