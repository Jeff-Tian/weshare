import React from "react"
import {Button, InputItem, List} from "antd-mobile"
import {createForm} from 'rc-form'

const validateAccount = (rule: any, value: string, callback: (error?: Error) => void) => {
    if (value && value.length > 4) {
        callback()
    } else {
        callback(new Error('账号最少需要 4 个字符'))
    }
}

const onSubmit = () => {
    
}

export function Form(props: any) {
    const {getFieldProps, getFieldError} = props.form

    return <form>
        <List renderHeader={() => '登录'} renderFooter={() => ''}>
            <InputItem {...getFieldProps('account', {
                rules: [{
                    required: true,
                    message: '请输入账号'
                }, {validator: validateAccount}]
            })} clear error={!!getFieldError('account')}
                       onErrorClick={() => {
                           alert(getFieldError('account').join('、'))
                       }} placeholder={'请输入账号'}>账号：</InputItem>

            <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">密码：</InputItem>
            <List.Item>
                <Button type="primary" onClick={onSubmit}>登录</Button>
            </List.Item>
        </List>
    </form>
}

export default createForm()(Form)
