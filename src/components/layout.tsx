import {Drawer, Icon, NavBar, WingBlank} from "antd-mobile"
import sidebar from "./sidebar"
import ShareFrom from "../pages/share"
import SignIn from '../pages/signin'
import React from "react"
import 'antd-mobile/dist/antd-mobile.css'
import './layout.css'
import {BrowserRouter as Router, Route} from "react-router-dom"

export default function layout(onOpenChange: () => void, drawerOpen: boolean) {
    return <Router basename={process.env.PUBLIC_URL}>
        <div className="flex-container" style={{padding: '0 0 15px 0'}}>
            <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={onOpenChange}>微信分享</NavBar>
            <Drawer className="my-drawer" style={{
                minHeight: document.documentElement.clientHeight
            }} enableDragHandle sidebar={sidebar}
                    open={drawerOpen} onOpenChange={onOpenChange}>
                <div>
                    <WingBlank>
                        <Route path="/" exact component={ShareFrom}/>
                        <Route path="/sign-in" exact component={SignIn}/>
                    </WingBlank>
                </div>
            </Drawer>
        </div>
    </Router>
}
