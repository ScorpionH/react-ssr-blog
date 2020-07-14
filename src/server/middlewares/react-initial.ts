import { Context } from 'koa'
import { matchPath } from 'react-router'
import routeConfigList from '../../share/route-config'
import * as Type from '../../share/typings'
const matchRoute = async (path: string): Promise<Type.Component | null> => {
    let component: Type.Component | null = null;
    for (const routeConfig of routeConfigList) {
        if (matchPath(path, routeConfig)) {
            component = routeConfig.component;
            // if(routeConfig.async){
            //     //component = await (routeConfig.component().props.load()).default
            // }else{
            //     component = routeConfig.component
            // }
        }
    }
    return component;
}
const reactInitial = async (ctx: Context, next: () => Promise<object>) => {
    const path = ctx.request.path;
    if(path === '/favicon.ico'){
        return;
    }
    const targetComponent = await matchRoute(path);
    let initialData: {[key: string]: any} = {};
    if (targetComponent && typeof targetComponent.getInitialData === 'function') {
        initialData = await targetComponent.getInitialData(ctx.request.url.split('/').pop());
    }
    ctx.initialData = initialData || {};
    await next();
}
export default reactInitial;