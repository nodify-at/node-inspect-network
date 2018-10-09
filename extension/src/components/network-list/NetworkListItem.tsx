import * as React            from 'react';
import { WebSocketResponse } from '../../../../node-inspect-network-request/shared/src/models/WebSocketResponse';
import * as moment           from 'moment';

export interface NetworkListItemProperties {
    item: WebSocketResponse;
    onSelect: (item: WebSocketResponse) => void
}

export class NetworkListItem extends React.Component<NetworkListItemProperties> {

    render() {
        const { item } = this.props;
        return (
            <tr className={item.response && item.response.code !== 200 ? 'error' : 'ok'} onClick={() => this.props.onSelect(item)}>
                <td>{item.url}</td>
                <td>{item.response ? item.response.code : item.state}</td>
                <td>{item.method}</td>
                <td>{item.response ? NetworkListItem.bytesToSize(item.response.length) : '...'}</td>
                <td>{item.response ? moment.duration(item.response.elapsedTime, 'seconds').humanize() : '...'}</td>
            </tr>
        );
    }

    private static bytesToSize(bytes: number = 0): string {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return 'n/a'
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        if (i === 0) return `${bytes} ${sizes[i]}`;
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
    }
}
