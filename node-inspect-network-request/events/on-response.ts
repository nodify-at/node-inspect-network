import { Request, Response }               from 'request';
import { RequestState, WebSocketResponse } from '../shared/src/models/WebSocketResponse';
import { socket }                          from '../WebSocketProvider';

export function onResponse(request: Request, id: string) {
    request.on('response', function(res: Response) {
        if (this.callback) {
            // callback specified, request will buffer the body for
            // us, so wait until the complete event to do anything
        } else {
            const data: WebSocketResponse = {
                id,
                state:    RequestState.FINISHED,
                url:      this.uri.href,
                method:   this.method,
                headers:  this.headers,
                response: {
                    body:        res.body,
                    headers:     res.headers,
                    code:        res.statusCode,
                    elapsedTime: new Date().getTime() - this.start,
                    length:      res.body.toString().length
                }
            };
            socket.send(data);
        }
    });

}
