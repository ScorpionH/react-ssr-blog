import { Context } from 'koa'
import { matchPath } from 'react-router'
import routeConfigList from '../../share/route-config'
import ReactSSR from '../../types/ReactSSR'
const matchRoute = (path: string): ReactSSR.StaicInitial | null => {
    for (const routeConfig of routeConfigList) {
        if (matchPath(path, routeConfig)) {
            return routeConfig.component;
        }
    }
    return null;
}
const reactInitial = async (ctx: Context, next: () => Promise<object>) => {
    const path = ctx.request.path;
    const targetComponent = matchRoute(path);
    let initialData: any = {};
    if (targetComponent) {
        initialData.data = await targetComponent.getInitialData();
    }
    ctx.initialData = initialData;
    await next();
}
export default reactInitial;