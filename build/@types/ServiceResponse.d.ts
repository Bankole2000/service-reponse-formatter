import { AppResponse } from './AppInterface';
export declare class ServiceResponse implements AppResponse {
    message: string;
    success: boolean;
    data?: any;
    error?: unknown;
    fix?: string | undefined | null;
    newAccessToken?: string | undefined | null;
    errMessage: string | undefined | null;
    statusCode: number;
    meta?: any;
    constructor(message: string, data: any, success: boolean, statusCode: number, errMessage: string | undefined | null, error?: any, fix?: string | undefined | null, newAccessToken?: string | undefined | null, meta?: any);
}
