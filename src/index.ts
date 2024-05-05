import { Rez, TStatus, TStatusType, statusMap, statuses } from './serviceResponses';
export { Rez, statuses, StatusType, IDataAccess, statusMap, TResponseData, TStatus, TStatusType, TResponseFormatter } from './serviceResponses';
export { ServiceResponse } from './@types/ServiceResponse';
export { ServiceEvent } from './@types/ServiceEvent';
const { OK, Created, NoContent, BadRequest, Unauthorized, Forbidden, NotFound, MethodNotAllowed, TimeoutError, UnsupportedMediaType, ExpectationFailed, UnprocessableEntity, TooManyRequests, InternalServerError, ServiceUnavailable, GatewayTimeout } = Rez
export { OK, Created, NoContent, BadRequest, Unauthorized, Forbidden, NotFound, MethodNotAllowed, TimeoutError, UnsupportedMediaType, ExpectationFailed, UnprocessableEntity, TooManyRequests, InternalServerError, ServiceUnavailable, GatewayTimeout }
const error = new Error('We could not find the thing')
const result = statusMap.get(404)!({message: 'just could not find it', error })
const sr = Rez[result.statusType]({...result});
console.log({result, sr});