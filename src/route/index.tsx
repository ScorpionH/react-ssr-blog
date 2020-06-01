import React from 'react'
import Layout from '../client/components/layout'
import {Route, Switch} from 'react-router-dom'
type RouteConfigList = {
    component: React.ComponentClass,
    path: string,
    exact: boolean
}
type RouteProps = {
    routeConfigList: Array<RouteConfigList>
}
const RouteApp: React.FC<RouteProps> = ({routeConfigList}) => {
    return (
        <Layout>
            <Switch>
                {routeConfigList.map((routeConfig, index) => (
                    <Route key={index} exact={routeConfig.exact} path={routeConfig.path} component={routeConfig.component} />
                ))}
            </Switch>
        </Layout>
    )
}
export default RouteApp;