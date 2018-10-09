import { WebSocketResponse }    from '../../../../node-inspect-network-request/shared/src/models/WebSocketResponse';
import * as React               from 'react';
import { NetworkHeaderViewer }  from '../network-header-viewer/NetworkHeaderViewer';
import { NetworkContentViewer } from '../network-content-viewer/NetworkContentViewer';

interface NetworkRequestTabsProperties {
    item: WebSocketResponse;
    onClick: (menu: any) => void;
}

interface NetworkRequestTabsStateProperties {
    menu: any;
}

export class NetworkRequestTabs extends React.Component<NetworkRequestTabsProperties, NetworkRequestTabsStateProperties> {

    public static menus = [
        {
            name: 'Headers',
            component: (item: WebSocketResponse) => <NetworkHeaderViewer item={item} />
        },
        {
            name: 'Preview',
            component: (item: WebSocketResponse) => <NetworkContentViewer item={item} />
        },
        {
            name: 'Response',
            component: (item: WebSocketResponse) => <NetworkContentViewer item={item} raw={true} />
        }
    ];

    state= {
        menu: NetworkRequestTabs.menus[0]
    };

    onClick = (menu: any) => {
        this.setState({ menu });
        this.props.onClick(menu);
    };

    render() {
        const active = this.state.menu;
        return (
            <ul className="nav nav-tabs">
                {
                    NetworkRequestTabs.menus.map(menu => (
                        <li key={menu.name} className="nav-item" onClick={() => this.onClick(menu)}>
                            <a className={`nav-link ${menu === active ? 'active' : ''}`} href="#">{ menu.name }</a>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
