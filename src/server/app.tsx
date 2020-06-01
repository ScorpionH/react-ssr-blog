
import React from 'react'
import Koa from 'koa';
import koaStatic from 'koa-static'
import path from 'path'
import reactSSR from './middlewares/react-ssr'
import {nodeServerPort} from '../share/pro-config'
const app = new Koa();
console.log(path.resolve(__dirname, '../client'))
app.use(koaStatic(path.resolve(__dirname, '../client')));
app.use(reactSSR);
app.listen(nodeServerPort, () => {
    console.log('app is started in :' + nodeServerPort)
});

