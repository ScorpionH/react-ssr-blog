import React, { ComponentProps } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import './index.scss'
interface IHomeProps {
    count: number,
    list: number[],
    dispatch: Dispatch
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
        return {
            home: { list: res, count: 1 }
        };
    }

    render() {
        return (
            <div>
                <span className='home'>Home</span>
                <span onClick={() => { this.props.dispatch({ type: 'ADD' }) }}>{this.props.count}</span>
                {this.props.list.map(i => <span key={i}>{i}</span>)}
            </div>
        )
    }
}
function mapStateToProps(state: any) {
    const { count, list } = state.home;
    return { count, list };
}
function mapDispatchToProps(dispatch: Dispatch, ) {
    return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);