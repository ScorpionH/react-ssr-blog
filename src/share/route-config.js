import Home from '../client/pages/home'
import About from '../client/pages/about'
export default [
    {
        path: '/home',
        component: Home,
        exact: true
    },
    {
        path: '/about',
        component: About,
        exact: true
    }
]