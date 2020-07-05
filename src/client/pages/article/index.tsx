import React, { FC, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import marked from 'marked'
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router-dom'
import * as hljs from 'highlight.js/lib/core'
import * as javascript from 'highlight.js/lib/languages/javascript'
import * as request from '../../../share/request'
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


const Publish: any = (props: { md: string, dispatch: Dispatch, } & RouteComponentProps) => {
    const { md, dispatch } = props;
    const dom = useRef(null);
    useEffect(() => {
        console.log(dom.current)
        //hljs.highlightBlock(dom.current);
        if (!md) {
            const res = request.getList();
            //new TextDecoder().decode(new Uint8Array(res.list[0].article.data))
            dispatch({
                type: 'INIT',
                data: {
                    md: new TextDecoder().decode(new Uint8Array(res.list[0].article.data))
                }
            });
        }
    }, []);
    const result = marked(props.md, { renderer: renderer });


    return (
        <div className='article'>
            <div ref={dom} className='md' dangerouslySetInnerHTML={{ __html: result }}></div>
        </div>
    )
}
Publish.getInitialData = async (articleId: string | undefined) => {
    if (!articleId)
        return { article: {} };
    const res = await request.getList<any>();
    return {

        article: {
            md: new TextDecoder().decode(new Uint8Array(res.data.list[0].article.data))
        }
    };
}
function mapStateToProps(state: any) {
    return {
        md: state.article.md
    }
}
function mapDispatchToProps(dispatch: Dispatch,) {
    return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Publish);