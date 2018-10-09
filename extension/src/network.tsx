import * as React      from 'react';
import * as ReactDOM   from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/base.scss';
import { NetworkList } from './components/network-list/NetworkList';

ReactDOM.render(
    <NetworkList />,
    document.getElementById('inspector')
);
