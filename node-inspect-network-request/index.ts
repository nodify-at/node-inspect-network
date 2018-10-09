import { Request }    from 'request';
import { socket }     from './WebSocketProvider';
import { onResponse } from './events/on-response';
import { onComplete } from './events/on-complete';
import { onError }    from './events/on-error';
import { onRedirect } from './events/on-redirect';
import { onData }     from './events/on-data';
import { onRequest }  from './events/on-request';

// Thanks to https://github.com/request/request-debug to help me creating this class

export class InspectNetworkRequest {

    init(request: Request, port: number = 8088) {
        if (!socket.isStarted) {
            socket.start(port);
        }
        const proto = InspectNetworkRequest.requestPrototype(request);

        if (!(proto as any)._initBeforeDebug) {
            (proto as any)._initBeforeDebug = proto.init;
            proto.init = function () {
                if (!this.initialized) {
                    this.initialized = true;
                    const id = Math.random().toString(36).substr(2, 20);
                    onRequest(this, id);
                    onData(this, id);
                    onResponse(this, id);
                    onComplete(this, id);
                    onError(this, id);
                    onRedirect(this, id);
                }
                return proto._initBeforeDebug.apply(this, arguments)
            }
        }
        this.stopDebugging(request, proto);
    }

    static requestPrototype(request: any): any {
        let proto: any;
        if (request.Request) {
            proto = request.Request.prototype
        } else if (request.get && request.post) {
            // The object returned by request.defaults() doesn't include the
            // Request property, so do this horrible thing to get at it.  Per
            // Wikipedia, port 4 is unassigned.
            const req = request('http://localhost:4').on('error', function () {});
            proto = req.constructor.prototype
        } else {
            throw new Error(
                'Pass the object returned by require(\'request\') to this function.')
        }
        return proto;
    }

    private stopDebugging(request: Request, proto: any) {
        if (!(request as any).stopDebugging) {
            (request as any).stopDebugging = function () {
                proto.init = proto._initBeforeDebug;
                delete proto._initBeforeDebug
            }
        }
    }
}

export const inspectNetworkRequest = (request: any) => new InspectNetworkRequest().init(request);
