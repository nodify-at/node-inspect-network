import WebSocket = require("ws");
import { WebSocketResponse } from './shared/src/models/WebSocketResponse';

class WebSocketProvider {
    static shared = new WebSocketProvider();
    private ws: WebSocket.Server | undefined;
    public isStarted: boolean = false;

    constructor() { }

    start(port: number) {
        this.ws = new WebSocket.Server({
            port: port,
            clientTracking: true
        });

        this.ws.on('listening', () => {
            this.isStarted = true;
            console.log(`Listening on http://localhost:${port}`);
        });
    }

    send(payload: WebSocketResponse) {
        if (!this.ws || !this.ws.clients) return;

        this.ws.clients.forEach((ws: WebSocket) => {
            ws.send(JSON.stringify(payload));
        });
    }
}

export const socket = WebSocketProvider.shared;
