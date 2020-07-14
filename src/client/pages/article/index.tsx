import React, { FC, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import marked from 'marked'
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router-dom'
import * as hljs from 'highlight.js/lib/core'
import * as javascript from 'highlight.js/lib/languages/javascript'
import * as request from '../../../share/request'
import ArticleTypes from '../../../share/typings/article'
import Types from '../../../share/typings'
import './index.scss';

const renderer = new marked.Renderer();

marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
});
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
hljs.registerLanguage('javascript', javascript);

type ArticleType = Pick<ArticleTypes.ArtilceState, 'article'>
const Article: FC<ArticleType & RouteComponentProps<{id: string}>> & Types.InitialComponent = (props) => {
    const { article } = props;
    console.log(article)
    //console.log(props.match.params.id);
    const dom = useRef(null);
    useEffect(() => {
        console.log(typeof props.article?.article);
        //md: new TextDecoder().decode(new Uint8Array(res.list[0].article.data))
    }, []);
    //const result = marked(props.md, { renderer: renderer });
    return (
        <div className='article'>
            {
                article ?
                    <div ref={dom} className='md' dangerouslySetInnerHTML={{ 
                        __html: marked(new TextDecoder().decode(new Uint8Array(article.article.data)), {renderer}) 
                    }}></div> : '文章未找到'

            }

        </div>
    )
}
Article.getInitialData = async (articleId: string | undefined): Promise<ArticleType> => {
    console.log(articleId)
    if (!articleId)
        return { article: null };
    try {
        const res = await request.getArticle<ArticleType>(articleId);
        return {
            article: res.data?.article
        };
    } catch (e) {
        return { article: null }
    }
}
function mapStateToProps(state: ArticleType) {
    return {
        article: state.article
    }
}
function mapDispatchToProps(dispatch: Dispatch,) {
    return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);