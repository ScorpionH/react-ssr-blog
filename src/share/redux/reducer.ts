import home_reducer from '../../client/pages/home/reducer';
import article_reducer from '../../client/pages/article/reducer'
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

