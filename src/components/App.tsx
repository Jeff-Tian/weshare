import React from 'react';
import {Flex} from "antd-mobile";

export interface AppProps {
}

export const App = (props: AppProps) => <div className="flex-container">
    <Flex>
        <Flex.Item>Hello</Flex.Item>
        <Flex.Item>World</Flex.Item>
    </Flex>
</div>
