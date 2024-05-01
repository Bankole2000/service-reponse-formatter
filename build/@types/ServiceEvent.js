"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEvent = void 0;
class ServiceEvent {
    constructor(type, data, idToken, accessToken, origin = 'UNKNOWN', serviceQueues = []) {
        this.type = type;
        this.data = data;
        this.origin = origin;
        this.idToken = idToken;
        this.accessToken = accessToken;
        this.serviceQueues = serviceQueues;
    }
}
exports.ServiceEvent = ServiceEvent;
