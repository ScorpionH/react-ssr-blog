import React from 'react'
import {RouteComponentProps} from 'react-router-dom'
class About extends React.Component {
    constructor(props: RouteComponentProps){
        super(props);
    }
    click = () => {
        alert(123)
    }
    render(){
        return <div onClick={this.click}>
            <span>about</span>
        </div>
    }
}
export default About;