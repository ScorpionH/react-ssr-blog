import { Context } from 'koa'
import { matchPath } from 'react-router'
import routeConfigList from '../../share/route-config'
const matchRoute = async (path: string): Promise<any> => {
    let component: any = null;
    for (const routeConfig of routeConfigList) {
        if (matchPath(path, routeConfig)) {
            if(routeConfig.async){
                component = await (routeConfig.component().props.load()).default
            }else{
                component = routeConfig.component
            }
        }
    }
    return component;
}
const reactInitial = async (ctx: Context, next: () => Promise<object>) => {
    const path = ctx.request.path;
    const targetComponent = await matchRoute(path);
    let initialData: any = {};
    if (targetComponent) {
        initialData.data = await targetComponent.getInitialData();
    }
    ctx.initialData = initialData;
    await next();
}
export default reactInitial;