import Home from '../client/pages/home'
import About from '../client/pages/about'
import Article from '../client/pages/article'
import Publish from '../client/pages/publish'
//import * as Type from './typings'
import { RouteConfig } from './typings'
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
    },
    {
        path: '/about',
        component: About,
        exact: true,
    },
    {
        path: '/article/:id',
        component: Article,
        exact: true,
        authority: true,
    },
    {
        path: '/publish',
        component: Publish,
        exact: true,
        authority: true,
    }
]

export default routeConfigList;