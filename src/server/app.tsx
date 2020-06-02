import React from 'react'
import Koa from 'koa';
import koaStatic from 'koa-static'
import path from 'path'
import reactSSR from './middlewares/react-ssr'
import config from '../share/pro-config'
const app = new Koa();
console.log(path.resolve(__dirname, '../client'))
app.use(koaStatic(path.resolve(__dirname, '../client')));
app.use(reactSSR);
app.listen(config.nodeServerPort, () => {
    console.log('app is started in :' + config.nodeServerPort)
});

