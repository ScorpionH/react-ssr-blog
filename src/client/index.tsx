import React from 'react'
import ReactDOM from 'react-dom'
import RouteApp from '../route'
import routeConfigList from '../share/route-config'
import { BrowserRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../share/redux/reducer'

const store = createStore(reducer, {home_reducer: {count: 1}})

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <RouteApp routeConfigList={routeConfigList} />
        </BrowserRouter>
    </Provider>
    , document.getElementById('app')
);