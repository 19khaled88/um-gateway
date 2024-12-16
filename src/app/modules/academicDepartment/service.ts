import { Request } from 'express';
import { CoreService as HttpService } from '../../../shared/axios';
import { IGenericResponse } from '../../../interfaces/common';

const createService = async (req: Request):Promise<IGenericResponse>=> {

  const response:IGenericResponse = await HttpService.post('/academic-department/create', req.body, {
    headers: {
      Authorization: req.headers.authorization
    }
  });
  return response;
};

const getAllService = async (req: Request):Promise<IGenericResponse>=> {

  const response:IGenericResponse = await HttpService.get ('/academic-department/all',  {
    params:req.query,
    headers: {
      Authorization: req.headers.authorization
    }
  });
  return response;
};

const updateService = async (req: Request)=> {
  const {id} = req.params;

  const response:IGenericResponse = await HttpService.put (`/academic-department/${id}`, req.body, {

    headers: {
      Authorization: req.headers.authorization
    }
  });
  return response;
};

const deleteService = async (req: Request)=> {
  const {id} = req.params;

  const response:IGenericResponse = await HttpService.delete (`/academic-department/${id}`,  {

    headers: {
      Authorization: req.headers.authorization
    }
  });
  return response;
};

export const AcademicDepartmentService = {
  createService,
  getAllService,
  updateService,
  deleteService
};
