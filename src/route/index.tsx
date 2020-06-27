import React from 'react'
import Layout from '../client/components/layout'
import { Route, Switch } from 'react-router'
import { RouteComponentProps, Redirect, Link, withRouter } from 'react-router-dom'
type RouteConfig = {
    path: string | string[],
    exact: boolean,
    async?: boolean,
    authority?: boolean,
    component: any
}
type RouteProps = {
    routeConfigList: Array<RouteConfig>,
}

function RouteApp(props: RouteProps) {
    const { routeConfigList } = props;
    return (
        <Layout>
            <Link to='/'>home</Link>
            <Link to='/about'>about</Link>
            <Link to='/article?id=123'>文章</Link>
            <Switch>
                {routeConfigList.map((item, index) => {
                    //判断是否有初始数据
                    return (
                        <Route
                            key={index}
                            exact={item.exact}
                            path={item.path}
                            render={(props: RouteComponentProps) => {
                                return <item.component {...props}></item.component>
                            }}
                        >
                        </Route>
                    )
                })}
            </Switch>
        </Layout>
    )
}

export default RouteApp