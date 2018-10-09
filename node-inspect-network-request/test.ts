import { inspectNetworkRequest } from './index';

const request: any = require('request');
inspectNetworkRequest(request);

setInterval(() => {
    request('http://nodify.ltd/portfolio.json', () => {});
}, 5000);
