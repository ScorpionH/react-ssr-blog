import { Dispatch } from 'redux'
import { AnyAction } from 'redux'
import HomeTypes from '../../../share/typings/home'
const INIT = (articleList: HomeTypes.HomeState['articleList']): AnyAction => ({
    type: 'INIT',
    data: {
        articleList
    }
})
export default {
    INIT
}