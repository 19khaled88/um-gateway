import axios, { AxiosInstance } from 'axios';
import config from '../config';
import ApiError from '../errors/apiError';
import httpStatus from 'http-status';

const HttpService = (baseUrl: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if(error.response){
        switch(error.response.status){
          case 404:
            return Promise.reject(new ApiError(httpStatus.NOT_FOUND,error.response.data.message));
          case 500:
            return Promise.reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Internal Server Error'));
          default:
            return Promise.reject(error)
          
          
        }
      }else if(error.request){
        return Promise.reject(new ApiError(httpStatus.NO_CONTENT,'No response from server'))
      }else{
        return Promise.reject(new Error(error.message));
      }
    }
  );

  return instance;
};

const AuthService = HttpService(config.authServiceUrl);
const CoreService = HttpService(config.coreServiceUrl);

export { HttpService, AuthService, CoreService };
