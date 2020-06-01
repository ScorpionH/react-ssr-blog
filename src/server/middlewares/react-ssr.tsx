import React from 'react'

//服务端渲染方法
import { renderToString } from 'react-dom/server'
import { Context } from 'koa';
import routeListConfig from '../../share/route-config'
import {StaticRouter} from 'react-router-dom'
import RouteApp from '../../route'
const reactSSR = (ctx: Context, next: () => Promise<object>) => {
    const html = renderToString(
        <StaticRouter location={ctx.request.url}>
            <RouteApp routeConfigList={routeListConfig}/>
        </StaticRouter>
    )
    ctx.body = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>my react ssr</title>
            <link href="css/index.css" rel="stylesheet">
        </head>
        <body>
            <div id="app">${html}</div>
        </body>
        </html>
        <script type="text/javascript"  src="js/runtime.js"></script>
        <script type="text/javascript"  src="js/index.js"></script>
    `;

    next();
}
export default reactSSR;