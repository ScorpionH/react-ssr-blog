import React, { ChangeEvent } from 'react'
import { Form, Input, Button } from 'antd'
import { FormProps, FormInstance, } from 'antd/lib/form';
const { Item } = Form;
type Props = {

}
class Publish extends React.Component {
    formRef = React.createRef<FormInstance>();
    componentDidMount() {
        //console.log(this.formRef.current);
    }
    fileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const reader = new FileReader();
        if (files) {
            //reader.readAsText(files[0], 'utf8');
            reader.readAsArrayBuffer(files[0])
            reader.onload = () => {
                console.log(reader.result);
                console.log(new TextDecoder().decode(new Uint8Array((reader.result) as ArrayBuffer)));
            }
        }
    }
    render() {
        return (
            <>
                <Form ref={this.formRef}>
                    <Input onChange={this.fileChange} type='file' />
                </Form>
            </>
        )
    }
}
export default Publish