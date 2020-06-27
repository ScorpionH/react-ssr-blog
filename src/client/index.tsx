import React from 'react'
import ReactDOM from 'react-dom'
import RouteApp from '../route'
import routeConfigList from '../share/route-config'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../share/redux/reducer'
import './index.scss'
let initData = {};
if(window.__WINDOW_INITDATA__){
    initData = window.__WINDOW_INITDATA__;
}
const store = createStore(reducer, {...initData});
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <RouteApp routeConfigList={routeConfigList} />
        </BrowserRouter>
    </Provider>
    , document.getElementById('app')
);