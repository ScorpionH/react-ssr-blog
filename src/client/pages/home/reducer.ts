import { AnyAction, Action } from 'redux'


const initialState = {
    count: 10
}
const reducer =  (state = initialState, action: Action & {[extraProps: string]: any}) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, count: ++state.count};
        default:
            return state;
    }
}
export default reducer;