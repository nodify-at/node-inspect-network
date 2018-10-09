import * as React             from 'react';
import { NetworkListItem }    from './NetworkListItem';
import './styles/NetworkList.scss';
import { WebSocketResponse }  from '../../../../node-inspect-network-request/shared/src/models/WebSocketResponse';
import { NetworkRequestTabs } from '../network-request-tabs/NetworkRequestTabs';

interface NetworkListStateProperties {
    items: WebSocketResponse[],
    active?: WebSocketResponse,
    component: (item: WebSocketResponse) => void;
}

export class NetworkList extends React.Component<{}, NetworkListStateProperties> {

    state = {
        items:     [],
        active:    undefined,
        component: NetworkRequestTabs.menus[0].component
    };

    private ws?: WebSocket;

    componentDidMount(): void {
        this.ws = new WebSocket('ws://localhost:8088');
        this.ws.onmessage = event => {
            if (event.data) {
                const item: WebSocketResponse = JSON.parse(event.data);
                let items: WebSocketResponse[] = this.state.items;
                const index = items.findIndex(current => current.id === item.id);
                if (index > -1) {
                    items[index] = item;
                } else {
                    items.push(item);
                }
                this.setState({ items });
            }
        }
    }

    componentWillUnmount(): void {
        if (this.ws) {
            this.ws.close();
        }
    }

    onSelect = (item: WebSocketResponse) => {
        if (this.state.active === item) {
            return this.setState({ active: undefined });
        }
        this.setState({ active: item });
    };

    render() {
        const items: WebSocketResponse[] = this.state.items;

        const classNames = ` ${this.state.active ? 'col-md-7 panel active' : 'col-md-12 panel'}`;
        return (
            <div className="row container-network">
                <div className={classNames}>
                    <table id="network" className="table table-bordered">
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Status</td>
                            <td>Type</td>
                            <td>Size</td>
                            <td>Time</td>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => <NetworkListItem key={item.id} item={item} onSelect={this.onSelect}/>)}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.active &&
                    <div className="col-md-5 panel">
                        <NetworkRequestTabs item={this.state.active as unknown as WebSocketResponse} onClick={menu => this.setState({ component: menu.component })}/>
                        {this.renderSelectedStatement()}
                    </div>
                }
            </div>
        )
    }

    renderSelectedStatement() {
        if (!this.state.active) {
            return null;
        }
        return this.state.component(this.state.active as unknown as WebSocketResponse);
    }
}
