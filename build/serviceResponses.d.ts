import { ServiceResponse } from "./@types/ServiceResponse";
declare enum StatusType {
    OK = "OK",
    Created = "Created",
    NoContent = "NoContent",
    BadRequest = "BadRequest",
    Unauthorized = "Unauthorized",
    Forbidden = "Forbidden",
    NotFound = "NotFound",
    TimeoutError = "TimeoutError",
    TooManyRequests = "TooManyRequests",
    MethodNotAllowed = "MethodNotAllowed",
    ExpectationFailed = "ExpectationFailed",
    InternalServerError = "InternalServerError",
    UnProcessableEntity = "UnProcessableEntity",
    UnSupportedMediaType = "UnSupportedMediaType",
    ServiceUnavailable = "ServiceUnavailable",
    GatewayTimeout = "GatewayTimeout"
}
type TResponseData = {
    message?: string | undefined;
    data?: any | undefined;
    success?: boolean | undefined;
    error?: any | null | undefined;
    errMessage?: string | undefined;
    fix?: string | undefined;
    newAccessToken?: string | undefined;
    meta?: any;
};
declare const statusCodes: number[];
type TStatusType = keyof typeof StatusType;
type TStatusCode = typeof statusCodes[number];
type TStatus = {
    code: TStatusCode;
    message: string;
    fix?: string;
};
interface TFuncResult {
    data: any | null | undefined;
    error?: any | null | undefined;
    status: TStatus;
}
interface IDataAccess {
    result: TFuncResult | undefined;
}
declare const httpStatus: {
    [key in StatusType]: TStatus;
};
type TResponseFormatter = (ResponseData: TResponseData) => ServiceResponse;
declare let Rez: {
    [key in StatusType | string]: TResponseFormatter;
};
export { Rez, httpStatus as statuses, StatusType, TStatusType, TFuncResult, TStatus, TResponseData, IDataAccess, TResponseFormatter };
