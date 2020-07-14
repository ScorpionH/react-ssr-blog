import React from 'react'
import { Button } from 'antd'
import { Link, withRouter, RouteComponentProps, } from 'react-router-dom'
import {connect} from 'react-redux'
import './index.scss'
import Header from '../header'
interface props { }
interface state { }
class Index extends React.Component<props & RouteComponentProps, state> {
    constructor(props: RouteComponentProps) {
        super(props);
    }
    render() {
        return (
            <div className='layout'>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(Index);