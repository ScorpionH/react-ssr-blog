import home_reducer from '../../client/pages/home/reducer';


//合并多个 reducer
import {combineReducers } from 'redux';

export default combineReducers({
    home_reducer
});

