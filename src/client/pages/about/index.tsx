import React from 'react'
class About extends React.Component {
    constructor(props: any){
        super(props);
    }
    // static async getInitialData(){
        
    // }
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