import { Headers } from 'request';

export enum RequestState {
    STARTED  = 'STARTED',
    LOADING  = 'LOADING',
    REDIRECT = 'REDIRECT',
    FINISHED = 'FINISHED',
    ERROR    = 'ERROR'
}

export interface RequestResponse {
    body?: any,
    elapsedTime?: any,
    headers: Headers,
    code?: number,
    length?: number
}

export interface WebSocketResponse {
    id: string;
    state: RequestState,
    url: string,
    method: string,
    headers: Headers,
    response?: RequestResponse
}
