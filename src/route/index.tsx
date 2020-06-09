import React from 'react'
import Layout from '../client/components/layout'
import { Route, Switch } from 'react-router'
import ReactSSR from '../types/ReactSSR'
import { RouteComponentProps } from 'react-router-dom'
type RouteProps = {
    routeConfigList: Array<ReactSSR.RouteConfig>,
}
const RouteApp: React.FC<RouteProps> = props => {
    const { routeConfigList } = props;
    return (
        <Layout>
            <Switch>
                {routeConfigList.map((item, index) => {
                    //判断是否有初始数据
                    return <Route
                        key={index}
                        exact={item.exact}
                        path={item.path}
                        render={(props: RouteComponentProps & { initialData: any }) => {
                            props.initialData = item.initialData;
                            return <item.component {...props}></item.component>
                        }}>
                    </Route>
                })}
            </Switch>
        </Layout>
    )
}

export default RouteApp;