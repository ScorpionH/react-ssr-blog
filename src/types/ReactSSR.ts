import { ComponentClass } from 'react'
import {ConnectedComponent} from 'react-redux'
namespace ReactSSR {
    export interface StaicInitial {
        getInitialData: Function
    }
    export interface RouteConfig {
        path: string | string[],
        exact: boolean,
        component: any
        initialData: any
    }
}
export default ReactSSR;