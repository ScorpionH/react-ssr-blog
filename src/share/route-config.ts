import Home from '../client/pages/home'
import About from '../client/pages/about'
import ReactSSR from '../types/ReactSSR'
const routeConfigList: ReactSSR.RouteConfig[] = [
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