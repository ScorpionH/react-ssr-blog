import React, { FC, ReactElement, ReactNode } from 'react'
import { Input, Form } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

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
})

const Publish: FC<{}> = props => {
    const [form] = Form.useForm();
    const result = marked('``` js\n function test(){} \n```', { renderer: renderer });
    console.log(result)
    return (
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
    )
}
export default Publish;