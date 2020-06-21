import React, { FC, useEffect } from 'react'
import { Input, Form } from 'antd'
import marked from 'marked'
import * as hljs from 'highlight.js/lib/core'
import * as javascript from 'highlight.js/lib/languages/javascript'
const renderer = new marked.Renderer();
hljs.registerLanguage('javascript', javascript)
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
// hljs.initHighlightingOnLoad();

const Publish: FC<{}> = props => {
    const [form] = Form.useForm();
    let result = marked('``` js\n function test(){} \n```', { renderer: renderer });
    console.log(result)
    return (
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
    )
}
export default Publish;