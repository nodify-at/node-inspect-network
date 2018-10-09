import { Request }                         from 'request';
import { RequestState, WebSocketResponse } from '../shared/src/models/WebSocketResponse';
import { socket }                          from '../WebSocketProvider';

export function onRequest(request: Request, id: string) {
    request.on('request', function() {
        const data: WebSocketResponse = {
            id,
            state:   RequestState.STARTED,
            url:     this.uri.href,
            method:  this.method,
            headers: this.headers
        };
        this.started = new Date().getTime();
        socket.send(data);
    });

}
