import React from 'react'
import Layout from '../client/components/layout'
import { Route, Switch } from 'react-router'
import { RouteComponentProps, } from 'react-router-dom'
import * as Type from '../share/typings'



function RouteApp(props: {routeConfigList: Array<Type.RouteConfig>}) {
    const { routeConfigList } = props;
    return (
        <Layout>
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