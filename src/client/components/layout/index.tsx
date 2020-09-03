import React from 'react'
import { Link, withRouter, RouteComponentProps, } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.scss'
import * as Type from '../../../share/typings'
interface props {
    device: 'pc' | 'mobile'
}
interface state { }
class Index extends React.Component<props & RouteComponentProps, state> {
    constructor(props: props & RouteComponentProps) {
        super(props);
    }
    render() {
        const { device } = this.props;

        return (
            <div className='layout'>
                <header className='header'>

                </header>
                <div className={`main-content main-content-${device}`}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state: Type.StateType) {
    const { userAgent } = state;
    return { device: userAgent.device }
}
export default withRouter(connect(mapStateToProps)(Index));