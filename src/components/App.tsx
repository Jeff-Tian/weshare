import React from 'react';
import {Flex, WingBlank} from "antd-mobile";
import 'antd-mobile/dist/antd-mobile.css';
import ShareForm from './share/form'

export interface AppProps {
}

export const App = (props: AppProps) => <div className="flex-container" style={{padding: '15px 0'}}>
    <WingBlank>
        <Flex>
            <Flex.Item>
                <ShareForm/>
            </Flex.Item>
        </Flex>
    </WingBlank>
</div>
