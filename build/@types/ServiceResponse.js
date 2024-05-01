"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
class ServiceResponse {
    constructor(message, data, success, statusCode, errMessage, error, fix, newAccessToken, meta) {
        this.message = message;
        this.success = success;
        this.data = data;
        this.error = error;
        this.errMessage = errMessage;
        this.fix = fix;
        this.statusCode = statusCode;
        this.newAccessToken = newAccessToken;
        this.meta = meta;
    }
}
exports.ServiceResponse = ServiceResponse;
