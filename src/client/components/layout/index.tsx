import React from 'react'
import { Button } from 'antd'
import { Link, withRouter, RouteComponentProps, } from 'react-router-dom'
interface props { }
interface state { }
class Index extends React.Component<props & RouteComponentProps, state> {
    constructor(props: RouteComponentProps) {
        super(props);
    }
    render() {
        return (
            <div>
                <img src="/assets/images/1.jpg" alt=""/>
                <Link to='/'><Button>home</Button></Link>
                <Link to='/about'><Button>about</Button></Link>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Index);