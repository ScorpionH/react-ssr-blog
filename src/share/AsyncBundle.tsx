import React, {ReactElement} from 'react'
interface IProps{
    load: () => Promise<object>
    children: (Comp: typeof React.Component) => ReactElement
}
interface IState{
    mod: any
}
export default class AsyncBundle extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            mod: null
        }
    }
    componentDidMount(){
        if(!this.state.mod){
            this.load(this.props)
        }
    }
    load = (props: IProps) => {
        props.load().then((mod: any) => {
            this.setState({
                mod: mod.default || mod,
            })
        })
    }
    render(){
        return this.state.mod ? this.props.children(this.state.mod) : <div>loading.....</div>
    }
}