import React, { ChangeEvent, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { FormInstance, } from 'antd/lib/form';
import * as req from '../../../share/request'
import axios from 'axios'
const { Item } = Form;
type Props = {

}
const Publish: React.FC<{}> = prosp => {
    const formRef = React.createRef<FormInstance>();
    let article: any = '';
    let formData: FormData;
    if(!__IS_SERVER__){
        formData = new FormData();
    }
    const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const reader = new FileReader();
        
        if (files) {
            formData.append('file', files[0]);
            reader.readAsArrayBuffer(files[0])
            reader.onload = () => {
                article = reader.result;
                //article = new TextDecoder().decode(new Uint8Array((reader.result) as ArrayBuffer));
            }
        }
    }

    const _request = async () => {
        


        const res = await req.insert(formData)
        // console.log(formData.get('file'))
        // axios.post('http://localhost:4396/api/article/insert', formData)

        // fetch('http://localhost:4396/api/article/insert',{
        //     method: 'POST',
        //     body: JSON.stringify({data: article}),
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // }).then(res => res.json().then(r => console.log(r)));
    }
    return (
        <>
            <Form ref={formRef}>
                <Input onChange={fileChange} type='file' />
            </Form>
            <Button onClick={_request}>提交</Button>
        </>
    )
}
export default Publish