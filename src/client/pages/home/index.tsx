import React from 'react'
import './index.scss'
class Home extends React.Component {
    constructor(props: any){
        super(props);
    }
    click = () => {
        alert(123)
    }
    render(){
        return <div onClick={this.click}>
            <span className='home'>Home</span>
        </div>
    }
}
export default Home;