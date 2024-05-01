import { AppEvent } from './AppInterface';
export declare class ServiceEvent implements AppEvent {
    type: string;
    data: any;
    origin: string;
    idToken: string | null;
    accessToken: string | null;
    serviceQueues: string[];
    constructor(type: string, data: any, idToken: string | null, accessToken: string | null, origin?: string, serviceQueues?: string[]);
}
