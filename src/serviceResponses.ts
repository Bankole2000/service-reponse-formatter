import { ServiceResponse } from "./@types/ServiceResponse"

enum StatusType {
  OK = 'OK',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  NotFound = 'NotFound',
  TimeoutError = 'TimeoutError',
  TooManyRequests = 'TooManyRequests',
  MethodNotAllowed = 'MethodNotAllowed',
  ExpectationFailed = 'ExpectationFailed',
  InternalServerError = 'InternalServerError',
  UnProcessableEntity = 'UnProcessableEntity',
  UnSupportedMediaType = 'UnSupportedMediaType',
  ServiceUnavailable = 'ServiceUnavailable'
}

type TStatusType = keyof typeof StatusType;

const httpStatus: { [key: string]: { statusCode: number, message: string } } = {
  [StatusType.OK]: { statusCode: 200, message: 'OK' },
  [StatusType.BadRequest]: { statusCode: 400, message: 'Bad Request' },
  [StatusType.Unauthorized]: { statusCode: 401, message: 'Unauthorized' },
  [StatusType.Forbidden]: { statusCode: 403, message: 'Forbidden' },
  [StatusType.NotFound]: { statusCode: 404, message: 'Not found' },
  [StatusType.TimeoutError]: { statusCode: 408, message: 'Request timeout' },
  [StatusType.TooManyRequests]: { statusCode: 429, message: 'Too many requests' },
  [StatusType.MethodNotAllowed]: { statusCode: 405, message: 'Method Not Allowed' },
  [StatusType.ExpectationFailed]: { statusCode: 417, message: 'Expectation Failed' },
  [StatusType.InternalServerError]: { statusCode: 500, message: 'Internal Server Error' },
  [StatusType.UnProcessableEntity]: { statusCode: 422, message: 'Unprocessable Entity' },
  [StatusType.UnSupportedMediaType]: { statusCode: 415, message: 'Unsupported Media Type' },
  [StatusType.ServiceUnavailable]: { statusCode: 503, message: 'Service Unavailable' }
}

type TResponseData = {
  message?: string | undefined,
  data?: any | undefined,
  success?: boolean | undefined,
  error?: string | null | undefined,
  errMessage?: any | undefined,
  fix?: string | undefined,
  newAccessToken?: string | undefined,
  meta?: any
}

type TServiceResponse = Record<TStatusType, (ResponseData: TResponseData) => ServiceResponse>

type ResponseFormatter = (ResponseData: TResponseData) => ServiceResponse

let Rez: TServiceResponse

Object.keys(StatusType).forEach(status => {
  console.log(StatusType[status as TStatusType]);
  
  let statusFormat: ResponseFormatter;
  statusFormat = ({
    message = httpStatus[status].message,
    data = {},
    success = true,
    error = httpStatus[status].statusCode < 300 ? null : httpStatus[status].message,
    errMessage = httpStatus[status].statusCode < 300 ? null : status,
    fix = httpStatus[status].statusCode < 300 ? null : 'please contact support',
    newAccessToken = null,
    meta = null
  }) => {
    return new ServiceResponse(message, data, success, httpStatus[status].statusCode, error, errMessage, fix, newAccessToken, meta)
  }
  Rez[StatusType[status as TStatusType]] = statusFormat
});

export { Rez, httpStatus }