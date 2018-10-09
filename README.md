# Node Network Inspector
Node.js does not support `--debug` option from v8 and we can not run `node-inspector`
to debug requests for now with Chrome Developer Tools.

This Project targets to provide a simple extension and a module for node.js to monitor
http(s) requests made via a Node.js application.

***Do NOT use this module in production!!***

`node-inspect-network` module creates a websocket server to communicate with extension.

## Extension Installation
You must install the extension provided by this project either via Chrome Web Store
or you can import directly to Chrome after building extension locally.

You can build this extension locally in a simple way: 
1. Go to extension folder
2. `npm install`
3. `npm run build`
4. Import `dist` folder as an extension in chrome

## Module Setup
You must include `node-inspect-network` to your module.  Setup is easy:
1. `npm i node-inspect-network`
2. ```js
        import { inspectNetworkRequest } from 'node-inspect-network';
        
        const request = require('request');
        
        // Enable this only for debugging!
        inspectNetworkRequest(request);
   ``` 

  