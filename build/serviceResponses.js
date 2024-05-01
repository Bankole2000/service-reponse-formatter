"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusType = exports.statuses = exports.Rez = void 0;
const ServiceResponse_1 = require("./@types/ServiceResponse");
var StatusType;
(function (StatusType) {
    StatusType["OK"] = "OK";
    StatusType["Created"] = "Created";
    StatusType["NoContent"] = "NoContent";
    StatusType["BadRequest"] = "BadRequest";
    StatusType["Unauthorized"] = "Unauthorized";
    StatusType["Forbidden"] = "Forbidden";
    StatusType["NotFound"] = "NotFound";
    StatusType["TimeoutError"] = "TimeoutError";
    StatusType["TooManyRequests"] = "TooManyRequests";
    StatusType["MethodNotAllowed"] = "MethodNotAllowed";
    StatusType["ExpectationFailed"] = "ExpectationFailed";
    StatusType["InternalServerError"] = "InternalServerError";
    StatusType["UnProcessableEntity"] = "UnProcessableEntity";
    StatusType["UnSupportedMediaType"] = "UnSupportedMediaType";
    StatusType["ServiceUnavailable"] = "ServiceUnavailable";
    StatusType["GatewayTimeout"] = "GatewayTimeout";
})(StatusType || (exports.StatusType = StatusType = {}));
const statusCodes = [200, 201, 204, 400, 401, 403, 404, 408, 429, 405, 417, 500, 422, 415, 503];
const httpStatus = {
    [StatusType.OK]: { code: 200, message: 'OK' },
    [StatusType.Created]: { code: 201, message: 'Created' },
    [StatusType.NoContent]: { code: 204, message: 'No Content' },
    [StatusType.BadRequest]: { code: 400, message: 'Bad Request', fix: 'Please check your inputs and try again' },
    [StatusType.Unauthorized]: { code: 401, message: 'Unauthorized', fix: 'You need to be logged in' },
    [StatusType.Forbidden]: { code: 403, message: 'Forbidden', fix: 'You are not authorized to do this' },
    [StatusType.NotFound]: { code: 404, message: 'Not Found', fix: 'Please confirm the resource exists' },
    [StatusType.TimeoutError]: { code: 408, message: 'Request Timeout', fix: 'Please check your internet connection' },
    [StatusType.TooManyRequests]: { code: 429, message: 'Too many requests', fix: 'Please try again after some time' },
    [StatusType.MethodNotAllowed]: { code: 405, message: 'Method Not Allowed' },
    [StatusType.ExpectationFailed]: { code: 417, message: 'Expectation Failed' },
    [StatusType.InternalServerError]: { code: 500, message: 'Internal Server Error', fix: 'Please contact support' },
    [StatusType.UnProcessableEntity]: { code: 422, message: 'Unprocessable Entity', fix: 'Please contact support' },
    [StatusType.UnSupportedMediaType]: { code: 415, message: 'Unsupported Media Type', fix: 'Please check the file / media type' },
    [StatusType.ServiceUnavailable]: { code: 503, message: 'Service Unavailable', fix: 'Please try again later' },
    [StatusType.GatewayTimeout]: { code: 504, message: 'Gateway Timeout', fix: 'Please try again or contact support' }
};
exports.statuses = httpStatus;
// type TServiceResponse = Record<TStatusType, ResponseFormatter>
let Rez = {};
exports.Rez = Rez;
Object.keys(StatusType).forEach(stat => {
    const status = StatusType[stat];
    let statusFormat;
    statusFormat = ({ message = httpStatus[status].message, data = httpStatus[status].code < 300 ? {} : null, success = httpStatus[status].code < 300 ? true : false, error = httpStatus[status].code < 300 ? null : httpStatus[status].message, errMessage = httpStatus[status].code < 300 ? null : httpStatus[status].message, fix = httpStatus[status].fix ? httpStatus[status].fix : null, newAccessToken = null, meta = null }) => {
        return new ServiceResponse_1.ServiceResponse(message, data, success, httpStatus[status].code, error, errMessage, fix, newAccessToken, meta);
    };
    Rez[StatusType[status]] = statusFormat;
});
