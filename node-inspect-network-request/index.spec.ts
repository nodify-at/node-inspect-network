import { socket }              from './WebSocketProvider';
import sinon, { SinonSandbox } from 'sinon';
import { WebSocketResponse }   from './shared/src/models/WebSocketResponse';
import { expect }              from 'chai';

describe('request must be decorated after executing of inspectNetworkRequest', () => {

    let sandbox: SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox({});
    });

    it(`should fire socket's send function with a payload of request data`, (done) => {
        const request = require('request');
        const inspectNetworkRequest = require('./index').inspectNetworkRequest;

        sandbox.replace(socket, 'start', () => {
        });
        sandbox.replace(socket, 'send', (payload: WebSocketResponse) => {
            expect(payload).to.haveOwnProperty('state');
            expect(payload.state).to.be.equal('STARTED');
            r.abort();
            done();
        });

        inspectNetworkRequest(request);
        const r = request('http://nodify.at');
    });

    it(`should fire socket's send function with a payload of request data with ERROR state`, (done) => {
        const request = require('request');
        const inspectNetworkRequest = require('./index').inspectNetworkRequest;

        sandbox.replace(socket, 'start', () => {
        });
        sandbox.replace(socket, 'send', (payload: WebSocketResponse) => {
            expect(payload).to.haveOwnProperty('state');
            expect(payload.state).to.be.equal('ERROR');
            done();
        });
        inspectNetworkRequest(request);
        request('invalid');
    });

    it(`should fail if object is not an instance/type of Request`, () => {
        expect(() => require('./index').inspectNetworkRequest({})).to
                                                                  .throws(`Pass the object returned by require('request') to this function`);
    });
});
