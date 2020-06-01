import React from 'react'
import { Layout, Button } from 'antd'
import { Link } from 'react-router-dom'
const { Header, Footer } = Layout;
interface props { }
interface state { }
class Index extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
    }
    render() {
        return <div>
            <Link to='/home'><Button>home</Button></Link>
            <Link to='/about'>about</Link>
            {this.props.children}
        </div>
    }
}

export default Index;