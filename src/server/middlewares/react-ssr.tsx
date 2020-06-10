import React from 'react'

//服务端渲染方法
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { Context as KoaContext } from 'koa';
import routeConfigList from '../../share/route-config'
import { StaticRouter, Switch, Route } from 'react-router-dom'
import RouteApp from '../../route'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../../share/redux/reducer'
import fs from 'fs';
import { resolve } from 'path'


const reactSSR = async (ctx: KoaContext, next: () => Promise<object>) => {
    let _html = fs.readFileSync(resolve(__dirname, '../client/main.html')).toString();
    const store = createStore(reducer, {...ctx.initialData});
    const renderString = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.request.url}>
                <RouteApp routeConfigList={routeConfigList} />
            </StaticRouter>
        </Provider>
    )
    _html = _html.replace('<!--inject html-->', renderString);
    _html = _html.replace('<!--inject js-->', `<script>window.__WINDOW_INITDATA__ = ${JSON.stringify(ctx.initialData)}</script>`)
    ctx.body = _html;
    next();
}
export default reactSSR;