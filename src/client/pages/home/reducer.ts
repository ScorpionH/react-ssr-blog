import { AnyAction, Action } from 'redux'

const initialState = {
    count: 0,
    list: []
}
const reducer = (state = initialState, action: Action & { [extraProps: string]: any }) => {
    switch (action.type) {
        case 'INIT':
            return {...state, ...action.data}
        case 'ADD':
            return { ...state, count: ++state.count };
        default:
            return state;
    }
}
export default reducer;