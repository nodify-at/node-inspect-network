"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
class Socket {
    constructor() {
    }
    start() {
        const server = require('http').createServer();
        this.ws = new WebSocket.Server({
            server,
            clientTracking: true
        });
        this.ws.on('listening', () => {
            console.log('Listening...');
        });
        this.ws.on('connection', () => {
        });
        server.listen(8088, function () {
            console.log('Listening on http://localhost:8088');
        });
    }
    send(payload) {
        if (!this.ws)
            return;
        this.ws.clients.forEach(ws => {
            ws.send(JSON.stringify(payload));
        });
    }
}
Socket.shared = new Socket();
exports.socket = Socket.shared;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQWlDO0FBRWpDLE1BQU0sTUFBTTtJQUlSO0lBQ0EsQ0FBQztJQUVELEtBQUs7UUFDRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFOUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDM0IsTUFBTTtZQUNOLGNBQWMsRUFBRSxJQUFJO1NBQ3ZCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQVk7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBRXJCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBaENNLGFBQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBbUNwQixRQUFBLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYlNvY2tldCA9IHJlcXVpcmUoXCJ3c1wiKTtcblxuY2xhc3MgU29ja2V0IHtcbiAgICBzdGF0aWMgc2hhcmVkID0gbmV3IFNvY2tldCgpO1xuICAgIHByaXZhdGUgd3M6IFdlYlNvY2tldC5TZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgY29uc3Qgc2VydmVyID0gcmVxdWlyZSgnaHR0cCcpLmNyZWF0ZVNlcnZlcigpO1xuXG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0LlNlcnZlcih7XG4gICAgICAgICAgICBzZXJ2ZXIsXG4gICAgICAgICAgICBjbGllbnRUcmFja2luZzogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLndzLm9uKCdsaXN0ZW5pbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTGlzdGVuaW5nLi4uJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMud3Mub24oJ2Nvbm5lY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlcnZlci5saXN0ZW4oODA4OCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xpc3RlbmluZyBvbiBodHRwOi8vbG9jYWxob3N0OjgwODgnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VuZChwYXlsb2FkOiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLndzKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy53cy5jbGllbnRzLmZvckVhY2god3MgPT4ge1xuICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNvY2tldCA9IFNvY2tldC5zaGFyZWQ7Il19