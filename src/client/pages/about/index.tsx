import React from 'react'
class About extends React.Component {
    constructor(props: any){
        super(props);
    }
    static async getInitialData(){
        const fetchData: () => Promise<object> = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(['a','b','c','d']);
            }, 1000)
        })
        const res = await fetchData();
        return res;
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