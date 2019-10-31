import {Button, ImagePicker, InputItem, List, Modal, TextareaItem, WingBlank} from "antd-mobile";
import React from "react";
import {createForm} from 'rc-form';

interface ShareFormProps {
    form: any;
}

function closest(el: any, selector: string) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class ShareForm extends React.Component<ShareFormProps> {
    state = {
        targetLink: '',
        files: [{
            url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
            id: '2121',
        }],
        modal: false
    };

    onChange = (files: Array<{}>, operationType: string, index?: number) => {
        console.log('files = ', files, operationType, index);
        this.setState({files})
    };

    onClose = (key: string) => () => {
        this.setState({
            [key]: false
        })
    };

    onWrapTouchStart = (e: any) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    };

    makeShare(e: Event) {
        e.preventDefault(); // 修复 Android 上点击穿透


        this.setState({modal: true})
    }

    componentDidMount() {
        fetch('https://uniheart.pa-ca.me/wechat-dev/js-sdk-sign?select=wechat&url=' + encodeURIComponent(location.origin + location.pathname)).then(r => r.json()).then((json: any) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: json.appId, // 必填，公众号的唯一标识
                timestamp: json.timestamp, // 必填，生成签名的时间戳
                nonceStr: json.nonceStr, // 必填，生成签名的随机串
                signature: json.signature, // 必填，签名
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData'
                ] // 必填，需要使用的JS接口列表
            })
        })
    }

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
                    selectable={files.length < 1}
                    multiple={false}
                    length={0}
                />

                <Button type="primary" onClick={this.makeShare.bind(this)}>分享</Button>

                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('modal')}
                    title="分享设置成功"
                    footer={[{
                        text: 'Ok', onPress: () => {
                            console.log('ok');
                            this.onClose('modal')();
                        }
                    }]}
                    wrapProps={{onTouchStart: this.onWrapTouchStart}}
                >
                    <div style={{height: 100, overflow: 'scroll'}}>
                        分享内容已经成功设置，你现在可以点击右上角进行分享了。
                    </div>
                </Modal>
            </List>
        )
    }
}

const exportedShareForm = createForm()(ShareForm);

export default exportedShareForm
