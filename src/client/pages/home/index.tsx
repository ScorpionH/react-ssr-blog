import React, { ComponentProps } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Link, withRouter, RouteComponentProps, RouteChildrenProps } from 'react-router-dom'
import * as request from '../../../share/request'
import HomeTypes from '../../../share/typings/home'
import Actions from './actions'
import './index.scss'
type ArticleList = HomeTypes.HomeState['articleList'];
type IHomeProps = {
    articleList: ArticleList,
    init: (articleList: ArticleList) => void
}
type IHomeState = {
    pager: {
        total: number,
        current: number,
        size: number,
    }
}

class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
    }
    async componentDidMount() {
        try {
            const res = await request.getArticleList<{ articleList: ArticleList }>();
            const { data } = res;
            console.log(data);
            if (data)
                this.props.init(data.articleList);
        } catch (e) {
            console.log(e)
        }
        $(".flipbook").turn({
            width: $('.flipbook')[0].offsetWidth,
            height: $('.flipbook')[0].offsetHeight,
            autoCenter: true,
            display: 'single',
            acceleration: true,
        });
    }
    static async getInitialData() {
        try {
            const res = await request.getArticleList<{ articleList: ArticleList }>();
            const { data } = res;
            if (data)
                return { home: { articleList: data.articleList } }
            return { home: { articleList: [] } }
        } catch (e) {
            return { home: { articleList: [] } }
        }
    }
    render() {
        const { articleList } = this.props;
        return (
            <div className="home">
                <div className="flipbook">
                    {
                        [1,2,3,4,5,6,7].map((i: number) => {
                            return <div key={i} className='_page'> Page 1 </div>
                        })
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state: { home: HomeTypes.HomeState }) {
    const { articleList } = state.home;
    return { articleList };
}
function mapDispatchToProps(dispatch: Dispatch,) {
    return {
        init: (articleList: ArticleList) => dispatch(Actions.INIT(articleList))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);