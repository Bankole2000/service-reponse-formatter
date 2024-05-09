"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusMap = exports.StatusType = exports.statuses = exports.Rez = void 0;
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
    StatusType["UnprocessableEntity"] = "UnprocessableEntity";
    StatusType["UnsupportedMediaType"] = "UnsupportedMediaType";
    StatusType["ServiceUnavailable"] = "ServiceUnavailable";
    StatusType["GatewayTimeout"] = "GatewayTimeout";
})(StatusType || (exports.StatusType = StatusType = {}));
const statusCodes = [200, 201, 204, 400, 401, 403, 404, 405, 408, 415, 417, 422, 429, 500, 503, 504];
const codeToStatus = {
    [statusCodes[0]]: StatusType.OK,
    [statusCodes[1]]: StatusType.Created,
    [statusCodes[2]]: StatusType.NoContent,
    [statusCodes[3]]: StatusType.BadRequest,
    [statusCodes[4]]: StatusType.Unauthorized,
    [statusCodes[5]]: StatusType.Forbidden,
    [statusCodes[6]]: StatusType.NotFound,
    [statusCodes[7]]: StatusType.MethodNotAllowed,
    [statusCodes[8]]: StatusType.TimeoutError,
    [statusCodes[9]]: StatusType.UnsupportedMediaType,
    [statusCodes[10]]: StatusType.ExpectationFailed,
    [statusCodes[11]]: StatusType.UnprocessableEntity,
    [statusCodes[12]]: StatusType.TooManyRequests,
    [statusCodes[13]]: StatusType.InternalServerError,
    [statusCodes[14]]: StatusType.ServiceUnavailable,
    [statusCodes[15]]: StatusType.GatewayTimeout,
};
const httpStatus = {
    [StatusType.OK]: { code: 200, message: 'OK', statusType: StatusType.OK },
    [StatusType.Created]: { code: 201, message: 'Created', statusType: StatusType.Created },
    [StatusType.NoContent]: { code: 204, message: 'No Content', statusType: StatusType.NoContent },
    [StatusType.BadRequest]: { code: 400, message: 'Bad Request', fix: 'Please check your inputs and try again', statusType: StatusType.BadRequest },
    [StatusType.Unauthorized]: { code: 401, message: 'Unauthorized', fix: 'You need to be logged in', statusType: StatusType.Unauthorized },
    [StatusType.Forbidden]: { code: 403, message: 'Forbidden', fix: 'You are not authorized to do this', statusType: StatusType.Forbidden },
    [StatusType.NotFound]: { code: 404, message: 'Not Found', fix: 'Please ensure the route or resource exists', statusType: StatusType.NotFound },
    [StatusType.MethodNotAllowed]: { code: 405, message: 'Method Not Allowed', statusType: StatusType.MethodNotAllowed },
    [StatusType.TimeoutError]: { code: 408, message: 'Request Timeout', fix: 'Please check your internet connection', statusType: StatusType.TimeoutError },
    [StatusType.UnsupportedMediaType]: { code: 415, message: 'Unsupported Media Type', fix: 'Please check the file / media type', statusType: StatusType.UnsupportedMediaType },
    [StatusType.ExpectationFailed]: { code: 417, message: 'Expectation Failed', statusType: StatusType.ExpectationFailed },
    [StatusType.UnprocessableEntity]: { code: 422, message: 'Unprocessable Entity', fix: 'Please contact support', statusType: StatusType.UnprocessableEntity },
    [StatusType.TooManyRequests]: { code: 429, message: 'Too many requests', fix: 'Please try again after some time', statusType: StatusType.TooManyRequests },
    [StatusType.InternalServerError]: { code: 500, message: 'Internal Server Error', fix: 'Please contact support', statusType: StatusType.InternalServerError },
    [StatusType.ServiceUnavailable]: { code: 503, message: 'Service Unavailable', fix: 'Please try again later', statusType: StatusType.ServiceUnavailable },
    [StatusType.GatewayTimeout]: { code: 504, message: 'Gateway Timeout', fix: 'Please try again or contact support', statusType: StatusType.GatewayTimeout }
};
exports.statuses = httpStatus;
const statusMap = new Map();
exports.statusMap = statusMap;
statusCodes.forEach(code => {
    statusMap.set(code, ({ message, fix, data, error }) => {
        const status = httpStatus[codeToStatus[code]];
        if (message)
            status.message = message;
        if (fix)
            status.fix = fix;
        if (data)
            status.data = data;
        if (error)
            status.error = error;
        return status;
    });
});
let Rez = {};
exports.Rez = Rez;
Object.keys(StatusType).forEach(stat => {
    const status = StatusType[stat];
    let statusFormat;
    statusFormat = ({ message = httpStatus[status].message, data = httpStatus[status].code < 300 ? {} : null, success = httpStatus[status].code < 300 ? true : false, error = httpStatus[status].code < 300 ? null : httpStatus[status].message, errMessage = httpStatus[status].code < 300 ? null : httpStatus[status].message, fix = httpStatus[status].fix ? httpStatus[status].fix : null, newAccessToken = null, meta = null }) => {
        if (error === null || error === void 0 ? void 0 : error.message)
            errMessage = error.message;
        return new ServiceResponse_1.ServiceResponse(message, data, success, httpStatus[status].code, errMessage, error, fix, newAccessToken, meta);
    };
    Rez[StatusType[status]] = statusFormat;
});
