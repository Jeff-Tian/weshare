import {Drawer, Flex, Icon, NavBar, WingBlank} from "antd-mobile"
import sidebar from "./sidebar"
import ShareForm from "./share/form"
import React from "react"
import 'antd-mobile/dist/antd-mobile.css'
import './layout.css'

export default function layout(onOpenChange: () => void, drawerOpen: boolean) {
    return <div className="flex-container" style={{padding: '0 0 15px 0'}}>
        <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={onOpenChange}>微信分享</NavBar>
        <Drawer className="my-drawer" style={{
            minHeight: document.documentElement.clientHeight
        }} enableDragHandle sidebar={sidebar}
                open={drawerOpen} onOpenChange={onOpenChange}>
            <div>
                <WingBlank>
                    <Flex>
                        <Flex.Item>
                            <ShareForm/>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        </Drawer>
    </div>
}
