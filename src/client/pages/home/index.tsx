import React, { ComponentProps } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {Link, withRouter, RouteComponentProps, RouteChildrenProps} from 'react-router-dom'
import * as request from '../../../share/request'

import './index.scss'

type IHomeProps  = {
    count: number,
    list: { title: string }[],
    device: 'pc' | 'mobile',
    dispatch: Dispatch
}
type IHomeState  = {

}

class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
    }
    async componentDidMount() {
        if (this.props.list.length == 0) {
            try {
                const res = await request.getList();
                const { data } = res;
                this.props.dispatch({
                    type: 'INIT',
                    data: {
                        list: data.list,
                        count: 1
                    }
                })
            } catch (e) {

            }
        }
    }
    static async getInitialData() {
        try {
            const res = await request.getList();
            const { data } = res;
            return { home: { list: data.list, count: 1 }, }
        } catch (e) {
            return {}
        }
    }
    getData = async () => {

    }
    render() {
        const artileList = [
            {
                title: '',
                desc: '',
                link: '',
                createTime: '',
                icons: ['', '']
            }
        ]
        return (
            <div className="home">
                <ul className="artile-list" >
                    <li className="artile-item">
                        <p className="title">react ssr</p>
                        <img src="/assets/images/icons8-react-20.png" alt=""/>
                    </li>
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state: any) {
    const { count, list } = state.home;
    const { device } = state.userAgent;
    return { count, list, device };
}
function mapDispatchToProps(dispatch: Dispatch,) {
    return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);