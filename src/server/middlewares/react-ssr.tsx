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
import sourceMap from '../../../dist/client/manifest.json'
import fs from 'fs';
import { resolve } from 'path'
import cheerio from 'cheerio'

const store = createStore(reducer, {home_reducer: {count: 1}});
const reactSSR = async (ctx: KoaContext, next: () => Promise<object>) => {


    const renderString = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.request.url}>
                <RouteApp routeConfigList={routeConfigList} />
            </StaticRouter>
        </Provider>
    )
    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>my react ssr</title>
                <link href="css/index.css" rel="stylesheet">
            </head>
            <body>
                <div id="app">${renderString}</div>
            </body>
            <script src='js/runtime.js'></script>
            <script src='js/react-lib.js'></script>
            <script src='js/antd-design.js'></script>
            <script src='js/index.js'></script>
        </html>
    `
    ctx.body = html;
    next();
}
export default reactSSR;