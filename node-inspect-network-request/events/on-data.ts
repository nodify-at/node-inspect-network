import { Request }                         from 'request';
import { RequestState, WebSocketResponse } from '../shared/src/models/WebSocketResponse';
import { socket }                          from '../WebSocketProvider';

export function onData(request: Request, id: string) {
    request.on('data', function(chunk: any) {
        const data: WebSocketResponse = {
            id,
            state:    RequestState.LOADING,
            url:      this.uri.href,
            method:   this.method,
            headers:  this.headers,
            response: {
                headers: this.response.headers,
                length:  chunk.length
            }
        };
        socket.send(data);
    });
}
