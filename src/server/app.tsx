import Koa from 'koa'
import koaStatic from 'koa-static'
import path from 'path'
import reactSSR from './middlewares/react-ssr'
import reactInitial from './middlewares/react-initial'
const app = new Koa();
app.use(koaStatic(path.resolve(__dirname, '../client')));
app.use(reactInitial);
app.use(reactSSR);
app.listen(9001, () => {
    console.log('app is started in : ' + "http://localhost:9001");
});

