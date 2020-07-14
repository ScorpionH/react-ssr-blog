import home_reducer from './home_reducer';
import article_reducer from './article_reducer'
//合并多个 reducer
import {combineReducers } from 'redux';
const user = (state = {isLogin: true, userName: '', avatar: ''}) => {
    return state;
}
export default combineReducers({
    home: home_reducer,
    article: article_reducer,
    userAgent: (state = {device: 'pc'}) => state,
    user
});

