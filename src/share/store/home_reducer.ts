import { AnyAction } from 'redux'
import HomeTypes from '../typings/home'
const initialState: HomeTypes.HomeState = {
    articleList: []
}
const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'INIT':
            return {...state, ...action.data}
        default:
            return state;
    }
}
export default reducer;