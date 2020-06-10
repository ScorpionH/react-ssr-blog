import Home from '../client/pages/home'
import About from '../client/pages/about'
import AsyncLoader from './AsyncLoader'
type RouteConfig = {
    path: string | string[],
    exact: boolean,
    async?: boolean,
    component: any
    initialData: any
}
const routeConfigList: RouteConfig[] = [
    // {
    //     path: ['/','/home'],
    //     component: AsyncLoader(() => import(/*webpackChunkName:"chunk-home"*/'../client/pages/home')),
    //     exact: true,
    //     async: true,
    //     initialData: {}
    // },
    {
        path: '/',
        component: Home,
        exact: true,
        initialData: {}
    },
    {
        path: '/about',
        component: About,
        exact: true,
        initialData: {}
    }
]

export default routeConfigList;