import React from 'react'
import ReactDOM from 'react-dom'
import RouteApp from '../route'
import routeConfigList from '../share/route-config'
import {BrowserRouter} from 'react-router-dom'


// ReactDOM.hydrate(<BrowserRouter>
//     <RouteApp routeConfigList={routeConfigList} />
// </BrowserRouter>, document.getElementById('app'));
ReactDOM.hydrate(<BrowserRouter>
    <RouteApp routeConfigList={routeConfigList} />
</BrowserRouter>, document.getElementById('app'));