import { WebSocketResponse } from '../../../../node-inspect-network-request/shared/src/models/WebSocketResponse';
import * as React            from 'react';
import ReactJson             from 'react-json-view'
import './styles/NetworkContentViewer.scss';

interface NetworkContentViewerProperties {
    item: WebSocketResponse;
    raw?: boolean;
}

export class NetworkContentViewer extends React.Component<NetworkContentViewerProperties> {

    render() {
        return (
            <div id="network-content-viewer">
                {this.parseContent()}
            </div>
        )
    }

    private parseContent() {
        const { item, raw } = this.props;
        if (!item || !item.response) {
            return null;
        }

        if (raw) {
            try {
                return JSON.stringify(item.response.body);
            } catch (_) {
                return item.response.body;
            }
        }
        try {
            const json = typeof item.response.body !== 'string' ? item.response.body : JSON.parse(item.response.body);
            return <ReactJson src={json} sortKeys={true} collapsed={2} />
        }
        catch (_) {
            return <iframe className="iframe" srcDoc={item.response.body} width={100}/>
        }
    }
}
