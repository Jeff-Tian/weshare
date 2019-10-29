import {ImagePicker, InputItem, List, TextareaItem} from "antd-mobile";
import React from "react";
import {createForm} from 'rc-form';

interface ShareFormProps {
    form: any;
}

class ShareForm extends React.Component<ShareFormProps> {
    state = {
        targetLink: '',
        files: [{
            url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
            id: '2121',
        }]
    };

    onChange = (files: Array<{}>, operationType: string, index?: number) => {
        console.log('files = ', files, operationType, index);
        this.setState({files})
    };

    render() {
        const {getFieldProps} = this.props.form;
        const {files} = this.state

        return (
            <List>
                <InputItem {...getFieldProps('link')} type="url" defaultValue="https://share.js.org/from"
                           placeholder="你要分享的链接" clear>
                    目标链接：
                </InputItem>

                <TextareaItem
                    {...getFieldProps('title')}
                    title="分享标题："
                    autoHeight
                    labelNumber={5}
                />

                <p>分享图标：</p>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 2}
                    multiple={false}
                    length={1}
                />
            </List>
        )
    }
}

const exportedShareForm = createForm()(ShareForm);

export default exportedShareForm
