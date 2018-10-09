import { Request, Response }               from 'request';
import { RequestState, WebSocketResponse } from '../shared/src/models/WebSocketResponse';
import { socket }                          from '../WebSocketProvider';

export function onComplete(request: Request, id: string) {
    request.on('complete', function(res: Response) {
        if (this.callback) {
            const data: WebSocketResponse = {
                id,
                state:    RequestState.FINISHED,
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
