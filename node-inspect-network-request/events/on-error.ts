import { Request, Response }               from 'request';
import { RequestState, WebSocketResponse } from '../shared/src/models/WebSocketResponse';
import { socket }                          from '../WebSocketProvider';

export function onError(request: Request, id: string) {
    request.on('error', function (res: Response) {
        if (this.callback) {
            // callback specified, request will buffer the body for
            // us, so wait until the complete event to do anything
        } else {
            const data: WebSocketResponse = {
                id,
                state:    RequestState.ERROR,
                url:      this.uri.href,
                method:   this.method,
                headers:  this.headers,
                response: {
                    body:        res.body,
                    code:        res.statusCode,
                    headers:     res.headers,
                    elapsedTime: res.elapsedTime,
                    length:      res.body ? res.body.toString().length : 0
                }
            };
            socket.send(data);
        }
    });

}
