import React from 'react'

//服务端渲染方法
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { Context as KoaContext } from 'koa';
import routeConfigList from '../../share/route-config'
import { StaticRouter } from 'react-router-dom'
import RouteApp from '../../route'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../../share/store'
import fs from 'fs';
import { resolve } from 'path'
const reactSSR = async (ctx: KoaContext, next: () => Promise<object>) => {
    const isMobile = /Andriod|iPhone|iPad|iPod|IEMobile/.test(ctx.request.header['user-agent']);
    let _html = fs.readFileSync(resolve(__dirname, '../client/main.html')).toString();
    const initialData = {...ctx.initialData, userAgent: {device: isMobile ? 'mobile' : 'pc'}};
    const store = createStore(reducer, initialData);
    const renderString = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.request.url}>
                <RouteApp routeConfigList={routeConfigList} />
            </StaticRouter>
        </Provider>
    )
    _html = _html.replace('<!--inject html-->', renderString);
    _html = _html.replace('<!--inject js-->', `<script>window.__WINDOW_INITDATA__ = ${JSON.stringify(initialData)}</script>`)
    ctx.body = _html;
    next();
}
export default reactSSR;