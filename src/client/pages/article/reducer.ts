import { AnyAction, Action } from 'redux'

const initialState = {
    md: ''
}
const reducer = (state = initialState, action: Action & { [extraProps: string]: any }) => {
    switch (action.type) {
        case 'INIT':
            return {...state, ...action.data};
        default:
            return state;
    }
}
export default reducer;