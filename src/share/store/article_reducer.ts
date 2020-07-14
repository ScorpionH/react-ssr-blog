import { AnyAction } from 'redux'
import ArticleTypes from '../typings/article'
const initialState: ArticleTypes.ArtilceState = {
    article: null
}
const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'INIT':
            return {...state, ...action.data};
        default:
            return state;
    }
}
export default reducer;