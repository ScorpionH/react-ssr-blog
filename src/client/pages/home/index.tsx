import React, { ComponentProps } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import './index.scss'
interface IHomeProps {
    initialData: {
        count: number
        numberList: number[]
    }
    add: () => void
}
interface IHomeState {
    
}
class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
    }
    static async getInitialData() {
        const fetchData: () => Promise<object> = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(['a', 'b', 'c', 'd']);
            }, 1000)
        })
        const res = await fetchData();
        return res;
    }

    render() {
        return (
            <div>
                <span className='home'>Home_test</span>
                <span onClick={() => {this.props.add()}}>{this.props.initialData.count}</span>
            </div>
        )
    }
}
function mapStateToProps(state: { home_reducer: { count: number } }) {
    return {
        initialData: state.home_reducer
    }
}
function mapDispatchToProps(dispatch: Dispatch,) {
    return {
        add : () => {
            dispatch({type: 'ADD'})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);