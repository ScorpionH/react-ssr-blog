import React, { ComponentProps } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as request from '../../../share/request'
import HomeTypes from '../../../share/typings/home'
import { Article } from '../../../share/typings/index'
import Actions from './actions'
import './index.scss'
type IHomeProps = {
    articleList: Article[],
    init: (articleList: Article[]) => void
}
type IHomeState = {
    current: number,
    toPage: number,
    flipbook: {
        turn: (method: string) => void
    }
}
const ArticleItem = () => {
    return (
        <div className="article-item">
            <div className="article-head">
                <p className="article-title">文章1</p>
                <p className="pub-time">2020-20-20</p>
            </div>
            <div className="article-body">
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            </div>
            <div className="article-footer">
                <img src="/assets/images/icons8-babel-20.png" alt="" />
            </div>
        </div>
    )
}
class Home extends React.Component<IHomeProps, IHomeState> {
    state = {
        toPage: 1,
        current: 1,
        flipbook: {
            turn: function (method: string) { }
        }
    }
    constructor(props: IHomeProps) {
        super(props);
    }
    async componentDidMount() {
        const that = this;
        try {
            const res = await request.getArticleList<{ articleList: Article[] }>();
            const { data } = res;
            console.log(data);
            if (data)
                this.props.init(data.articleList);
        } catch (e) {
            // console.log(e)
        }
        this.state.flipbook = $(".flipbook").turn({
            width: $('.flipbook')[0].offsetWidth,
            height: $('.flipbook')[0].offsetHeight,
            autoCenter: true,
            display: 'single',
            acceleration: true,
            when: {
                turning: function (event: Event, page: number,) {
                    that.setState({ current: page })
                },
                start: that.drop
            }
        });
    }
    static async getInitialData() {
        try {
            const res = await request.getArticleList<{ articleList: Article[] }>();
            const { data } = res;
            if (data)
                return { home: { articleList: data.articleList } }
            return { home: { articleList: [] } }
        } catch (e) {
            return { home: { articleList: [] } }
        }
    }
    // 拉起页脚
    drop = (event: Event, pageObject: { page: number, next: number }, corner: string | null) => {
        if (corner === null)
            return;
        const isNext = corner[1] === 'r';
        const { page } = pageObject;
        this.setState({ toPage: page + (isNext ? 1 : -1) })
    }
    // 翻页
    next = () => {
        this.state.flipbook.turn('next');
    }
    render() {
        const { articleList } = this.props;
        const { current } = this.state;
        const tempArticles: Article[] = [];
        const renderArray: Array<Article[]> = [];
        articleList.forEach((article: Article) => {
            if (tempArticles.push(article) === 5) {
                renderArray.push(tempArticles);
                tempArticles.length = 0;
            }
        });
        if (tempArticles.length)
            renderArray.push(tempArticles);
        return (
            <div className="home">
                <div className="flipbook">
                    {
                        renderArray.map((item: Article[], index: number) => {
                            return <div key={index} className='_page'>
                                {
                                    current === index + 1 ?
                                        item.map((article => <ArticleItem key={article.id}/>)) :
                                        null
                                }
                            </div>
                        }).concat(
                            [
                                renderArray.length === 0 ? <div className="_page">没有内容</div> : <></>,
                                <div className='_page'>
                                    {
                                        current === (renderArray.length || 1) + 1 ?
                                            <div>这个人很懒，什么也没留下。。。</div> : null
                                    }
                                </div>
                            ]
                        )
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
        init: (articleList: Article[]) => dispatch(Actions.INIT(articleList))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);