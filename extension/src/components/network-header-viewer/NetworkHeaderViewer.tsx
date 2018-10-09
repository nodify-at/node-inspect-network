import { WebSocketResponse } from '../../../../node-inspect-network-request/shared/src/models/WebSocketResponse';
import * as React            from 'react';
import ReactJson             from 'react-json-view';
import { Headers }           from 'request';

interface NetworkHeaderViewerProperties {
    item: WebSocketResponse;
}

export class NetworkHeaderViewer extends React.Component<NetworkHeaderViewerProperties>  {

    render() {
        return (
            <div className="row">
                { this.props.item.headers && NetworkHeaderViewer.renderHeaders(this.props.item.headers, 'Request Headers')}
                { this.props.item.response && NetworkHeaderViewer.renderHeaders(this.props.item.response.headers, 'Response Headers')}
            </div>
        );
    }

    private static renderHeaders(headers: Headers, title: string) {
        return (
            <div className="col-md-12">
                <h6>{ title }</h6>
                <ReactJson src={headers} sortKeys={true}/>
            </div>
        )
    }
}
